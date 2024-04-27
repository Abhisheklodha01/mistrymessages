import mongoose, { Schema, Document, models, model, Models } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  verifyCode: {
    type: String,
    required: [true, "verifyCode is required"],
  },

  verifyCodeExpiry: {
    type: Date,
    required: [true, "verifyCode Expiry is required"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },

  messages: [messageSchema],
});

const UserModel = models.users || model("users", userSchema);

export default UserModel;
