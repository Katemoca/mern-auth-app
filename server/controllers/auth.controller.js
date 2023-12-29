const User = require("../models/user.model");
require("dotenv").config;
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");
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
    //Now here we add a token to the cookie of the browser with Json Web Token (JWT)
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET);
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

const google = async (req, res, next) => {
  try {
    // Check if a user with the provided email already exists in the database
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // If user exists, generate a JWT token for authentication
      const token = jwt.sign({ id: user._id }, JWT_SECRET);

      // Extract sensitive information from the user object while excluding the password
      const { password: hashedPassword, ...rest } = user._doc;

      // Set an expiry date for the token (1 hour in this case)
      const expiryDate = new Date(Date.now() + 3600000);

      // Set the token as an HTTP-only cookie and send user information in the response
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      // If user does not exist, generate a random password and hash it
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user with the provided information
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8), // We add random numbers and strings at the end of the name = mariamuñoz23JHK234
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate a JWT token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      // Extract sensitive information from the new user object while excluding the password
      const { password: hashedPassword2, ...rest } = newUser._doc;

      // Set an expiry date for the token (1 hour in this case)
      const expiryDate = new Date(Date.now() + 3600000);

      // Set the token as an HTTP-only cookie and send user information in the response
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    // Handle any errors that occur during the process
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  google,
};
