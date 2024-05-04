import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";


export async function GET(request: Request) {
  await dbconnect();
 
  try {
    const userData = await UserModel.find()
    if (!userData) {
        return Response.json(
            {
              success: false,
              message: "user not found",
            },
            { status: 404 }
          );
    }
    return Response.json(
        {
          messages: userData[0].messages,
        },
        { status: 200 }
      );

  } catch (error) { 
    return Response.json(
        {
          success: false,
          message: "An unexpected error occured",
        },
        { status: 500 }
      );
  }
}






