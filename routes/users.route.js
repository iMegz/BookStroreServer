const Router = require("express").Router();
const { activate, signup, login } = require("../controllers/users.controller");

Router.post("/signup", signup);
Router.post("/login", login);
Router.get("/activate/:token", activate);

module.exports = Router;
