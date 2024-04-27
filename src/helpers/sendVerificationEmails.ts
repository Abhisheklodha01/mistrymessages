import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/veryficationemail";
import { ApiResponse } from "@/Types/ApiResponse";

export async function SendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Mistry Message | verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "verification email send successfully",
    };
  } catch (emailError) {
    console.log("Error sending verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
