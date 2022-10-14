import bcrypt from "bcrypt";
import mongoose from "mongoose";

import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      return res.json({ msg: "Username already used.", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used.", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        msg: "Username or Password is incorrect.",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        msg: "Username or Password is incorrect.",
        status: false,
      });
    }
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const setAvatarForUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userAvatarImage = req.body.image;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.json({
        msg: "Invalid User ID. Please clear browser cache and try again",
        status: false,
      });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage: userAvatarImage },
      { new: true }
    );

    return res.json({
      isSet: updatedUser.isAvatarImageSet,
      image: updatedUser.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const users = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
