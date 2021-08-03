const {
  generateToken,
  generateExpireDate,
  decodeBase64,
  encodeBase64,
} = require("../utils/utils");
const { now } = require("mongoose");
const { hash, compare } = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/users.model");
const exclude = ["-__v", "-password"];
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPass = await hash(password, 12);
  const user = new User({ username, email, password: hashedPass });
  try {
    const userExists = await User.find({
      $or: [{ email }, { username }],
    }).select(exclude);
    const token = `${user._id}${await generateToken(32)}`;
    if (userExists.length)
      next({ StatusCode: 400, ErrorCode: "ACCOUNT_EXISTS" });
    else {
      const encodedToken = encodeBase64(token);
      const expireDate = generateExpireDate(24);
      const status = { token, expireDate };
      user.status = status;
      const link = `${process.env.ACTIVATION}/${encodedToken}`;
      sendEmail(link, email);
      const createdUser = await user.save();
      createdUser.password = undefined;
      createdUser.status = undefined;
      createdUser.__v = undefined;
      res.status(200).json(createdUser);
    }
  } catch (err) {
    console.log(err);
    next({ ErrorCode: "DATABASE_ERROR" });
  }
};

exports.activate = async (req, res, next) => {
  const token = decodeBase64(req.params.token);
  const id = token.substr(0, 24);
  let ErrorCode = null;
  try {
    const user = await User.findById(id).select(exclude);
    if (user.status.token == token) {
      if (user.status.expireDate > now()) {
        user.status.active = true;
        await user.save();
        user.status = undefined;
        //change this later
        const closeTab = `<script>close();</script>`;
        res.status(200).send(closeTab);
      } else ErrorCode = "ACTIVATION_LINK_EXPIRED";
    } else ErrorCode = "ACTIVATION_LINK_INVALID";
  } catch (err) {
    console.log(err);
    next({ ErrorCode: "DATABASE_ERROR" });
  }
  if (ErrorCode) next({ ErrorCode, StatusCode: 400 });
};

exports.login = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  }).select(["-__v"]);
  if (user) {
    const passIsCorret = await compare(password, user.password);
    if (passIsCorret) {
      user.password = undefined;
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET);
      res.json(token);
    } else next({ ErrorCode: "PASSWORD_INCORRECT", StatusCode: 400 });
  } else next({ ErrorCode: "ACCOUNT_DOES_NOT_EXIST", StatusCode: 400 });
};
