const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { Session } = require('./session-model');

const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("USER", "ADMIN"), defaultValue: "USER" },
  nickname: { type: DataTypes.STRING },
  isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
});

User.hasMany(Session);
Session.belongsTo(User);

module.exports = { User };