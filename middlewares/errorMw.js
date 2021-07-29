module.exports = (error, req, res, next) => {
  const { ErrorCode, ErrorData, StatusCode } = error;
  res.status(StatusCode).json({ ErrorCode, ErrorData });
};
