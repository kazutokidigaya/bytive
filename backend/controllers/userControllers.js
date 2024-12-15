import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExsist = await User.findOne({ email });
    if (userExsist)
      return res
        .status(400)
        .json({ message: `User with ${email} already exsists` });

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    const userPayload = { id: newUser._id, name: newUser.name };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User Craeted Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Error creating User" + error.message);
    res.status(500).json({ message: "Error creating User" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "Please signup before logging in" });

    const comaprePassword = await bcrypt.compare(password, user.password);

    if (!comaprePassword)
      return res.status(400).json({ message: "Please enter correct password" });

    const userPayload = { id: user._id, name: user.name };
    const refreshToken = generateRefreshToken(userPayload);
    const accessToken = generateAccessToken(userPayload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login Successfull",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("login error" + error);
    res.status(500).json({ message: "Login Failed Please Try Again Later." });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing." });

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token" });

      const newAccessToken = generateAccessToken({
        id: user.id,
        name: user.name,
      });

      res.json({ accessToken: newAccessToken });
    }
  );
};

const logOut = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({ message: "Logget out successfully" });
};

export { createUser, loginUser, refreshToken, logOut };
