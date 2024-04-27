import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest } from "next/server";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  await dbconnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validate with zod

    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result);

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const exitingUser = await UserModel.findOne({ username, isVerified: true });
    if (exitingUser) {
      return Response.json(
        {
          success: false,
          message: "username already taken",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "username available",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error cheking username",
      },
      {
        status: 500,
      }
    );
  }
}
