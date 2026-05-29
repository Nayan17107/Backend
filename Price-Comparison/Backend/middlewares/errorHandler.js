const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  const statusCode = error.response?.status || error.statusCode || 500;
  const message = error.response?.data?.error || error.message || "Something went wrong";

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
