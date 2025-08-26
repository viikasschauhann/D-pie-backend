import { Router } from "express";
import { 
    sendOTP,
    registerUser
} from "../../controllers/user.controller/index.js";

const router = Router();

router.route("/send-otp").post(sendOTP);
router.route("/signup").post(registerUser);

export default router;