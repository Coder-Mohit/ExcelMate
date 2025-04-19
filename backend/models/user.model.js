import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    uniqe: true,
    trim: true,
    required: [true, "email is required"],
  },
  mobile: {
    type: String,
    uniqe: true,
    trim: true,
    required: [true, "no. is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "password is requried"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
    trim: true,
  },
  status: Number,
  role: String,
  info: String,
});

const userSchemaModel = mongoose.model("user_collection", userSchema);

export default userSchemaModel;
