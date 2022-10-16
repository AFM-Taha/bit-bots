import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

import userModel from "../model/userModel.js";
import tokenModel from "../model/tokenModel.js";
import genarateToken from "../utils/genarateToken.js";
import sendEmail from "../utils/sendEmail.js";

export const registerNewUserController = async (req, res) => {
  const { userName, email, password, phone, city, zipCode, streetAddress } =
    req.body;
  console.log(req.body);
  // check email and password is present
  if (!email)
    return res.status(401).send({ message: "must have a email to register" });
  if (!password)
    return res
      .status(401)
      .send({ message: "must have a password to register" });

  try {
    const exists = await userModel.findOne({ email });
    // check user exists
    if (exists) return res.status(404).send({ message: "user already exists" });
    // gen salt and hashed password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // create and save user
    const newUser = new userModel({
      userName: userName,
      email,
      password: hashedPassword,
      phone,
      city,
      zip: zipCode,
      streetAddress,
    });
    await newUser.save();
    // create access and refresh token
    const userId = newUser?._id;
    const { refreshToken } = await genarateToken(email, userId);
    // send response
    const message = `welcome to Bits-Bots, to access our website you need to verifiy your email first,
    <br/> please use this link below<br/>
    http://localhost:5000/api/users/verify/${userId}/${refreshToken}/`;
    sendEmail(email, message).then(() => {
      res
        .status(201)
        .send({ success: true, message: "Please Verify your email" });
    });
    // res.status(201).send({
    //   message: "successfully created a new user",
    //   accessToken,
    //   refreshToken,
    //   email: newUser.email,
    // });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// verify email

export const verifyUserEmail = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) res.status(400).send("user not found");

    const token = await tokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) res.status(400).send("invalid token");
    await userModel.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          verified: true,
        },
      }
    );

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN);

    res
      .status(201)
      .send({ success: true, message: "Email verified Successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user exists
    const exists = await userModel.findOne({ email });
    if (!exists) return res.status(404).send({ message: "user not exists" });

    const isPasswordMatched = await bcrypt.compare(password, exists.password);

    if (!isPasswordMatched)
      return res.status(401).send({ message: "password don't match" });

    const { accessToken, refreshToken } = await genarateToken(email);
    res.status(201).send({
      message: "logged in successfully",
      accessToken,
      refreshToken,
      email: exists.email,
    });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// check user is logged in

export const checkUserController = async (req, res) => {
  const email = req.decoded.email;

  try {
    const exists = await userModel.findOne({ email });

    if (!exists) {
      return res.status(401).send({ message: "user not found" });
    }
    return res
      .status(201)
      .send({ success: true, message: "User found", user: email });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// update user information

export const updateUserController = async (req, res) => {
  const {
    firstName,
    lastName,
    zipCode,
    phone,
    streetAddress,
    password,
    email,
    city,
  } = req.body;

  try {
    // check user exists
    const exists = await userModel.findOne({ email });

    if (!exists) return res.status(404).send({ message: "user not exists" });

    const isPasswordMatched = await bcrypt.compare(password, exists.password);
    if (!isPasswordMatched)
      return res.status(401).send({ message: "password don't matchs" });

    const updatedDoc = {
      $set: {
        userName: `${firstName} ${lastName}`,
        zip: zipCode,
        phone,
        streetAddress,
        city,
      },
    };
    const response = await userModel.updateOne({ email }, updatedDoc);
    res.status(201).send({ success: true, ...response });
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

const otp = Math.floor(100000 + Math.random() * 900000);

export const forgotPasswordController = async (req, res) => {
  const email = req.body.email;

  if (!email)
    return res
      .status(401)
      .send({ success: false, message: "please give your email address" });
  const requestedUser = await userModel.findOne({ email });
  if (!requestedUser)
    return res.status(401).send({ success: false, message: "user not exists" });

  const userId = requestedUser._id;
  const userToken = await tokenModel.findOne({ userId });

  const token = userToken.token;

  const message = `welcome to Bits-Bots, user the otp to change your password,
    <br/><b>please use this OTP </b> <br/>
   <h2> ${otp}</h2>`;

  sendEmail(email, message);

  res
    .status(201)
    .send({ success: true, message: "please check email for change password" });
};

export const changePasswordController = async (req, res) => {
  const password = req.body.password;
  const otp = req.body.otp;
  const email = req.query.email;

  const user = await userModel.findById(userId);
  const userToken = await tokenModel.findOne({ token });
  if (!user && !userToken)
    return res
      .status(403)
      .send({ success: false, message: "no user id and token" });
};
