import { sendOTP } from "./otp.controller.js";
import { registerUser } from "./registerUser.controller.js";
import { loginUser } from "./loginUser.controller.js";
import { logoutUser } from "./logoutUser.controller.js";
import { refreshAccessToken } from "./refreshToken.controller.js";

export {
    sendOTP,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}