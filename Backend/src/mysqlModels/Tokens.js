// src/models/user.js
const Sequelize = require("sequelize");
const sequelize = require("../config/MySqlDB");

const Tokens = sequelize.define("user", {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Tokens;
