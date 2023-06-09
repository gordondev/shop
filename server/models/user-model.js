const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { Token } = require('./token-model');

const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("USER", "ADMIN"), defaultValue: "USER" },
  firstName: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  secondName: { type: DataTypes.STRING },
  isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
});

User.hasMany(Token);
Token.belongsTo(User);

module.exports = { User };