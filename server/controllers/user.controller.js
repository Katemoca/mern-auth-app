const User = require("../models/user.model");
const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");

const test = (req, res) => {
  res.json({
    message: "API is up and running",
  });
};

// update user

// The 401 (Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true } // To verify that this is new info
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// User delete

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  test,
  updateUser,
  deleteUser,
};
