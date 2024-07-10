const User = require("../Model/userModel");

exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send;
    }

    const newUser = new User({ name, email, password });

    await newUser.save();
    return res.status(201).json({
      data: newUser,
      message: "signup successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in creating user" });
  }
};
