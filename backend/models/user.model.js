import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "name is required"],
  },
  email: {
    lowercase: true,
    type: String,
    unique: true,
    trim: true,
    required: [true, "email is required"],
  },
  mobile: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "no. is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "password is requried"],
  },
  city: {
    lowercase: true,
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
