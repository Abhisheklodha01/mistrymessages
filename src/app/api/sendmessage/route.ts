import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { Message } from "@/model/user";

export async function POST(request: Request) {
  await dbconnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "user not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);
    await user.save()
    
    return Response.json(
        {
          success: true,
          message: "Message send successfully",
        },
        { status: 200 }
      );


  } catch (error) {
    console.log(error);
    return Response.json(
        {
          success: false,
          message: "Error while adding messages",
        },
        { status: 500 }
      );
  }
}
