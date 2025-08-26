import otpGenerator from 'otp-generator';
import { OTP, User } from '../../models/index.js';
import { otpSchema } from '../../zod/index.js';
import { asyncHandler, ApiResponse } from '../../utils/index.js';

export const sendOTP = asyncHandler(async (req, res) => {

  const parsedData = otpSchema.safeParse(req.body);

  if(!parsedData.success) {
      return res.status(400).json(
        new ApiResponse(
          400,
          null,
          'Invalid request data'
        )
      );
  }

  const { email } = parsedData.data;

  try {

    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });
    
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json(
        new ApiResponse(
          401,
          null,
          'User is already registered'
        )
      );
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "OTP sent successfully"
      )
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(
      new ApiResponse(
        500,
        null,
        'Internal Server Error'
      )
    );
  }
});