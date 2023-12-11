const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const { JWT_SECRET } = process.env;

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error); // next(errorHandler(300, "Something went wrong"));
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // We validate the user´
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(400, "This user wasn't found"));
    //We validate the password and encrypt it
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    //Now here we add a token to the cookie of the browser with Jason Web Token (JWT)
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    //Then we get only the password by separating it from the rest (password, ...rest)
    const { password: hashedPassword, ...rest } = validUser._doc;
    // We add an expiry date or time for this access
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest); // We send the info without the password
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
};

// Repository: https://github.com/sahandghavidel/mern-auth/blob/main/api/controllers/auth.controller.js
