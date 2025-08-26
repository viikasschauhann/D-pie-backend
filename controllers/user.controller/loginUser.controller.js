import { signinSchema } from "../../zod/index.js";
import { User } from "../../models/index.js";
import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { cookieOptions } from "../../constants.js";

const generateAccessAndRefreshTokens = async function(userId) {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken};

    } catch (error) {
        throw error;
    }
}

export const loginUser = asyncHandler( (async (req, res) => {
    // req body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // send cookie

    const parsedData = signinSchema.safeParse(req.body);

    if(!parsedData.success) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                parsedData.error.format()
            )
        );
    }

    const {email, password} = parsedData.data;

    console.log("Email", email);
    console.log("Password", password);

    try {
        const user = await User.findOne({
            email
        });
    
        if(!user) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Email is incorrect or user is not registered."
                )
            );
        }
    
        const isPasswordValid = await user.isPasswordCorrect(password);

        console.log("Is Password Valid:", isPasswordValid);

        if(!isPasswordValid) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Password is not correct"
                )
            );
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfuly"
            )
        );
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Internal Server Error"
            )
        );
    }
}));