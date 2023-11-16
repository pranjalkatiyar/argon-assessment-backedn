const jwt = require("jsonwebtoken");
const User = require("../models/pg/user.model.js");
const { STRING } = require("sequelize");

const isAuthenticated = async (token) => {
  console.log("isAUTHENTICATED RUNNING");
  if (!token) {
    return { value: false, data: null };
  }

  const authtoken = token.split(" ")[1];

  const decoded = jwt.verify(authtoken, process.env.JWT_SECRET);
  console.log(typeof decoded.sub);
  if (!decoded) {
    return { value: false, data: null };
  }
  let user;
  if (decoded.sub.length < 10) {
    user = await User.findOne({
      where: { id: decoded.sub },
    });
    if (!user) {
      return { value: false, data: null };
    }
  } else {
    user = await User.findOne({
      where: { social_id: decoded.sub },
    });
    if (!user) {
      return { value: false, data: null };
    }
  }

  return { value: true, data: user };
};

module.exports = isAuthenticated;
