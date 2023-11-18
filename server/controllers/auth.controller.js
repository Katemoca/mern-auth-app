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
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
