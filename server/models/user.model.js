const mongoose = require("mongoose");

// This has to have all the needed properties to let the user sign up with Google and username, email, and password. To log in/ sign in it has to be made by using just the email and the password.

// The property "profilePicture" works for setting a placeholder that comes by default and allows us to show a picture at the home page with the rest of the information even though it wasn't necessary to sign up.

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfwH7S1S9BvB1ALl3t-jduzB4e5zsNjA8aDJI0SwSNmA&s",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// Documentation = https://mongoosejs.com/docs/models.html
