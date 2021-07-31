module.exports = (error, req, res, next) => {
  console.log("error");
  const { ErrorCode, ErrorData, StatusCode } = error;
  res.status(StatusCode).json({ ErrorCode, ErrorData });
};
