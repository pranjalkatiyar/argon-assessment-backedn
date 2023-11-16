// models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../db/pg.js");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
  last_name: {
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
  phone_number: {
    type: sequelize.Sequelize.STRING,
  },
  password:{
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
  provider: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
    defaultValue: "local",
  },
  social_id:{
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
  picture: {
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
});


module.exports = User;
