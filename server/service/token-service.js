const jwt = require("jsonwebtoken");
const { Token } = require("../models/token-model");

class TokenService {
  generateTokens(payload, deviceId) {
    const accessToken = jwt.sign(
      { ...payload, deviceId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { ...payload, deviceId },
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

  async saveToken(userId, refreshToken, deviceId) {
    const tokenData = await Token.findOne({ where: { userId, deviceId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.deviceId = deviceId;
      return tokenData.save();
    }
    const token = await Token.create({ userId, refreshToken, deviceId });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({
      where: { refreshToken },
    });
    return tokenData;
  }

  async refreshTokens(refreshToken, deviceId) {
    const tokenData = this.validateRefreshToken(refreshToken);
    if (!tokenData) {
      throw new Error("Invalid refresh token");
    }

    const { userId } = tokenData;
    const newTokens = this.generateTokens({ userId }, deviceId);

    await this.saveToken(userId, newTokens.refreshToken, deviceId);

    return newTokens;
  }
}

module.exports = new TokenService();
