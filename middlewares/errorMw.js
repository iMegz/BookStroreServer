module.exports = (error, req, res, next) => {
  console.log(error);
  let { ErrorCode, ErrorData, StatusCode } = error;
  ErrorCode = ErrorCode || "SERVER_ERROR";
  ErrorData = ErrorData || [];
  StatusCode = StatusCode || 500;

  res.status(StatusCode).json({ ErrorCode, ErrorData });
};
