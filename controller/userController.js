const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookies = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const allUsers = await User.find({});

    if (allUsers.length > 6) {
      return res.status(400).json({
        message: "Limit exceed. Please try again later",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "This email already exists",
      });
    }

    // HASH password
    const saLt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saLt);

    const newUser = new User({ name, email, password: hashedPassword });

    let token;
    if (newUser) {
      // generate JWT token
      token = generateTokenAndSetCookies(newUser._id, res);
      await newUser.save();
    } else {
      res.status(400).json({
        message: "Error in creating user",
      });
    }

    // console.log("TOKENNN", token);
    return res.status(201).json({
      data: newUser,
      token,
      message: "signup successful",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Error in creating user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // console.log("Check login");
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateTokenAndSetCookies(user._id, res);
    console.log(token);
    res.status(201).json({
      data: user,
      token,
      message: "login successful",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "User email does not exist" });
  }
  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
  await user.save({ validateBeforeSave: false });

  const resetLink = `${process.env.CLIENT_URL}/password/reset/${token}`;

  const message = `Your password reset token is :- \n\n${resetLink} \n\n If you have not requested this email, then please ignore it 😊`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Bread & Butter Password recovery",
      message,
    });
    res.status(200).json({
      message: `Reset password email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save({ validateBeforeSave: false });
    console.log("Error in sending password reset email", error.message);
    res.status(500).json({ error: "Failed to send password reset email" });
  }
};

exports.resetPassword = async (req, res) => {
  console.log("HELLO Check");
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Password doen not match" });
  }

  const cokkieToken = generateTokenAndSetCookies(user._id, res);
  // console.log(cokkieToken);
  // HASH password
  const saLt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saLt);

  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ data: user, cokkieToken, message: "Password reset successfully" });
};
