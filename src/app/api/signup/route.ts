import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import dbconnect from "@/lib/dbConnect";
import { SendVerificationEmail } from "@/helpers/sendVerificationEmails";
import UserModel from "@/model/user";

export async function POST(request: NextRequest) {
  await dbconnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByemail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByemail) {
      if (existingUserByemail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashPassword = await bcryptjs.hash(password, 10);
        existingUserByemail.password = hashPassword;
        (existingUserByemail.verifyCode = verifyCode),
          (existingUserByemail.verifyCodeExpiry = new Date(
            Date.now() + 3600000
          ));
        existingUserByemail.isVerified = true;
        await existingUserByemail.save();
      }
    } else {
      const hashPassword = await bcryptjs.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // send verifiaction email
    const emailResponse = await SendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error: "error in registering user', error);
    return Response.json(
      {
        success: false,
        message: "error in registering user",
      },
      {
        status: 500,
      }
    );
  }
}
