import { User } from "../../models/index.js";
import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { cookieOptions } from "../../constants.js";

export const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from documnent
            }
        },
        {
            new: true
        }
    );

    return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "User logged Out"));
});