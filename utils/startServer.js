const { color } = require("./utils");
module.exports = (app) => {
  let port = process.env.PORT || 3000;
  let listener;

  const listen = () => {
    listener = app.listen(port, onSuccess).on("error", onError);
  };

  const onSuccess = () => {
    const runningPort = color(listener.address().port, "green");
    console.log(`Server running on port : ${runningPort}`);
  };

  const onError = () => {
    if (process.env.NODE_ENV !== "production") {
      port++; //If port is unavailable use another one (not in production)
      listen();
    } else {
      console.log(color("Server failed to start", "red"));
    }
  };
  listen();
};
