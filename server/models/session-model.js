const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Session = sequelize.define("sessions", {
  id: { type: DataTypes.STRING(2000), primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  refreshToken: { type: DataTypes.STRING(2000) },
  device: { type: DataTypes.STRING },
  ip: { type: DataTypes.STRING },
  browser: { type: DataTypes.STRING },
});

module.exports = { Session };