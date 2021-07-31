if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");

//server and database functions
const connection = require("./utils/db");
const startServer = require("./utils/startServer");

//Middlewares
const headersMw = require("./middlewares/headersMw");
const errorMw = require("./middlewares/errorMw");

//Routers
const bookRouter = require("./routes/books.route");

//Start app
const app = express();

app.use(express.static("uploads"));
app.use(express.json());
app.use(headersMw);

app.use("/books", bookRouter);

app.use(errorMw);

//Start server
connection.once("open", () => {
  startServer(app);
});
