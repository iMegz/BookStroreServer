if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");

//Start server and database connection
const connection = require("./utils/db");
const startServer = require("./utils/startServer");

const app = express();

app.use(express.json());

connection.once("open", () => {
  startServer(app);
});
