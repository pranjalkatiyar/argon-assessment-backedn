// sequelize.js

const Sequelize = require("sequelize");
const dotenv=require("dotenv");
dotenv.config();
 

const sequelize = new Sequelize(
 process.env.PG_URI,
  { dialect: "postgres" }
);

module.exports = sequelize;
