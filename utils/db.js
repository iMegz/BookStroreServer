const { connect, connection } = require("mongoose");
const { loading, performance } = require("./utils");

const MONGODB_URI = process.env.MONGODB_URI;

const loadingMsg = loading("Connecting to database");
const initalTime = performance().start();
connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => {
  loadingMsg.stop();
  console.log(err);
});

connection.once("open", () => {
  loadingMsg.stop();
  performance().stop("Connected to database in", initalTime);
});

module.exports = connection;
