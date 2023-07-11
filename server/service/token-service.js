const jwt = require("jsonwebtoken");
const { Session } = require("../models/session-model");
const ApiError = require('../exceptions/api-error');
const { User } = require('../models/user-model');
const UserDto = require("../dtos/user-dto");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(
      { ...payload },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { ...payload },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken, deviceInfo) {
    const tokenData = await Session.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.ip = deviceInfo.ipAddress;
      tokenData.browser = deviceInfo.browser.name + deviceInfo.browser.version;
      tokenData.device = deviceInfo.device.type + deviceInfo.device.model + deviceInfo.device.brand;
      return tokenData.save();
    }
    const token = await Session.create({ 
      userId,
      refreshToken,
      ip: deviceInfo.ipAddress,
      browser: deviceInfo.browser.name + deviceInfo.browser.version,
      device: deviceInfo.device.type + deviceInfo.device.model + deviceInfo.device.brand,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Session.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Session.findOne({
      where: { refreshToken },
    });
    return tokenData;
  }

  async refreshTokens(refreshToken, deviceInfo) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = this.validateRefreshToken(refreshToken);
    const tokenFromDB = this.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    console.log("tokenData\n\n\n ", userData, "\n\n\n");

    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const newTokens = this.generateTokens({ ...userDto });

    await this.saveToken(userDto.id, newTokens.refreshToken, deviceInfo);

    return { ...newTokens, user: userDto };
  }
}

module.exports = new TokenService();
