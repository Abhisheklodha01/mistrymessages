import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbconnect();

  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;
  console.log(session);
  

  if (!session || !_user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(_user._id)
  
  try {
    const user = await UserModel.aggregate([
        {$match: { _id: userId } },
        {$unwind: '$messages'},
        {$sort: {'messages.createdAt': -1}},
        {$group: {_id: '$_id', messages: {$push: '$messages'}}}

    ]).exec();
    if (!user) {
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
          messages: user[0].messages,
        },
        { status: 200 }
      );

  } catch (error) {
    console.log(error);
    
    return Response.json(
        {
          success: false,
          message: "An unexpected error occured",
        },
        { status: 500 }
      );
  }
}






