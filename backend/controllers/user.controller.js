import userSchemaModel from "../models/user.model.js";
import "../connection.js";
import jwt from "jsonwebtoken";
import { key } from "../auth.key.js";
import { dataSaveExcel } from "../helper_methods/excel_data_save.js";
import bcrypt from "bcryptjs";

export const save = async (req, res) => {
  try {
    const { name, email, city, mobile } = req.body;
    const user = await userSchemaModel.findOne({
      $or: [{ email }, { mobile }],
    });
    if (user)
      return res
        .status(400)
        .json({ message: "email or mobile no. already exist" });
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userDetails = {
      ...req.body,
      status: 0,
      password: hashedPassword,
      info: Date(),
    };

    await userSchemaModel.create(userDetails);
    dataSaveExcel(name, email, city);
    return res
      .status(201)
      .json({ message: "User registered & saved to Excel" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await userSchemaModel.findOne({ email });
    if (!userDetails)
      return res.status(404).json({ message: "Email not registered" });

    const isMatch = bcrypt.compareSync(password, userDetails.password);

    if (!isMatch) return res.status(401).json({ message: "password mismatch" });
    console.log(isMatch);

    const payload = {
      id: userDetails._id,
      email: userDetails.email,
      role: userDetails.role,
    };
    const token = jwt.sign(payload, key);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
