import { Router } from "express";
import { 
    sendOTP,
    registerUser,
    loginUser,
    logoutUser
} from "../../controllers/user.controller/index.js";
import { verifyJWT, validateSchema } from "../../middlewares/index.js";
import { signupSchema, signinSchema, otpSchema, signoutSchema } from "../../zod/index.js";

const router = Router();

router.route("/send-otp").post(validateSchema(otpSchema), sendOTP);

router.route("/signup").post(validateSchema(signupSchema), registerUser);

router.route("/login").post(validateSchema(signinSchema), loginUser);

router.route("/logout").post(validateSchema(signoutSchema), verifyJWT, logoutUser);

export default router;