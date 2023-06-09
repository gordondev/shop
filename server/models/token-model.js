const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Token = sequelize.define("tokens", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  refreshToken: { type: DataTypes.STRING(2000) },
  deviceId: { type: DataTypes.STRING },
});


module.exports = { Token };