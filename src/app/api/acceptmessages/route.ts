import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbconnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptmessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptmessages,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "message acceptance status update failed ",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "failed to update user status for accepting messages",
      },
      { status: 404 }
    );
  }
}

export async function GET(request: NextRequest) {
    await dbconnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
  
    if (!session || !session?.user) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const userId = user._id;

   try {
     const foundUser = await UserModel.findById(userId)
 
     
     if (!foundUser) {
         return Response.json(
           {
             success: false,
             message: "failed to found user ",
           },
           { status: 404 }
         );
       }
 
       
    
         return Response.json(
           {
             success: true,
             isAcceptingMessage: foundUser.isAcceptingMessage
           },
           { status: 200 }
         );
   } catch (error) {
       console.log(error);
        return Response.json(
          {
            success: false,
            message: "Error in getting message acceptance status=*",
          },
          { status: 500 }
        );
   }
}
