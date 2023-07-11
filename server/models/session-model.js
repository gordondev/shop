const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Session = sequelize.define("sessions", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  refreshToken: { type: DataTypes.STRING(2000) },
  device: { type: DataTypes.STRING(2000) },
  ip: { type: DataTypes.STRING(2000) },
  browser: { type: DataTypes.STRING(2000) },
});

module.exports = { Session };