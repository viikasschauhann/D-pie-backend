import { asyncHandler, ApiResponse } from "../utils/index.js";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
    
        if(!token) {
            return res.status(401).json(
              new ApiResponse(401, "Access token is required", null, "access_token_required")
            );
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if(!user) {
            return res.status(401).json(
              new ApiResponse(401, "Invalid Access Token", null, "invalid_access_token")
            );
        }
    
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
          // Access token expired
          return res.status(401).json(
            new ApiResponse(401, "Access token expired", null, "access_token_expired")
          );
        }
        return res.status(401).json(
          new ApiResponse(401, error?.message || "Invalid access token.", null, "invalid_access_token")
        );
    }
});