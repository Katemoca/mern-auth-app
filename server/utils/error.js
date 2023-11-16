// There are sometimes in our application that we need to create a custome error. Probably there's no error but if some type of error happens and it doesn't have a message we can send ours.

const errorHandler = (statusCode, message) => {
  const error = new Error(); // Javascript constructor
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

module.exports = {
  errorHandler,
};
