// Here we're using the next function to go to the next middleware id the user is verified.
const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid"));

    req.user = user;
    next();
  });
};
