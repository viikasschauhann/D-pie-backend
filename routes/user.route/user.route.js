import { Router } from "express";
import { 
    sendOTP,
    registerUser,
    loginUser
} from "../../controllers/user.controller/index.js";

const router = Router();

router.route("/send-otp").post(sendOTP);

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

export default router;