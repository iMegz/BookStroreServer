const Router = require("express").Router();
const { activate, signup } = require("../controllers/users.controller");

Router.post("/signup", signup);
Router.get("/activate/:token", activate);

module.exports = Router;
