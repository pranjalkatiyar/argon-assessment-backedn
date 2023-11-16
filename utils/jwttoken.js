const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "24d" });
};

module.exports = generateToken;
