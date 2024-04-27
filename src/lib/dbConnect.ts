<<<<<<< HEAD
import { MONGO_URI } from "@/env_variable";
=======
>>>>>>> 2cf4e7788e8de4cf838a52b01a12de3d4726392b
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbconnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
<<<<<<< HEAD
    const db = await mongoose.connect(
     MONGO_URI ||
        ""
    );
=======
    const db = await mongoose.connect(process.env.MONGO_URI || "");
>>>>>>> 2cf4e7788e8de4cf838a52b01a12de3d4726392b

    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected");
  } catch (error) {
    console.log("Databse connection failed", error);

    process.exit(1);
  }
}

<<<<<<< HEAD
export default dbconnect;
=======

export default dbconnect 
>>>>>>> 2cf4e7788e8de4cf838a52b01a12de3d4726392b
