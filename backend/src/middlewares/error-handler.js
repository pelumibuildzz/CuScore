const createError = (message, statusCode = 500, details = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).send("Something went wrong!");
  } else {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = { createError, errorHandler };
