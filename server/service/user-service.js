const { User } = require('../models/user-model');
const argon2Utils = require('../utils/argon2Utils');
const ApiError = require('../exceptions/api-error');
const logger = require('../utils/logger');
const generateSalt = require('../utils/saltUtils');
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const { InternalServerError } = require('../exceptions/api-error');

class UserService {
  async checkExistingUser(email) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
      logger.warn('Пользователь с такой почтой уже существует', { email });
    }
  }

  async checkExistingUserForLogin(email) {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      throw ApiError.BadRequest('Пользователь не был найден');
      logger.warn('Пользователь не был найден', { email });
    }
    return existingUser;
  }

  async hashPassword(password, salt) {
    return await argon2Utils.hashPassword(password, salt);
  }

  async verifyPassword(password, hashedPassword) {
    return await argon2Utils.verifyPassword(password, hashedPassword);
  }

  async createUser(email, hashedPassword, firstName) {
    return await User.create({
      email,
      password: hashedPassword,
      firstName,
    });
  }

  async registration(email, password, firstName, deviceInfo) {
    try {
      await this.checkExistingUser(email);

      const salt = await generateSalt();
      const hashedPassword = await this.hashPassword(password, salt);
      const user = await this.createUser(email, hashedPassword, firstName);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken, deviceInfo);

      logger.info('Пользователь успешно зарегистрирован', { email, firstName });

      return { ...tokens, user: userDto };
    } catch (error) {
      logger.error('Ошибка при регистрации пользователя', { message: error.message, stack: error.stack });

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.InternalServerError('Произошла ошибка при регистрации пользователя');
    }
  }

  async login(email, password) {
    try {
      const existingUser = await this.checkExistingUserForLogin(email);

      const isPassEquels = await this.verifyPassword(password, existingUser.password);
      if (!isPassEquels) {
        throw ApiError.InternalServerError('Неверный пароль');
        logger.warn('Неверный пароль', { email });
      }

      const salt = await generateSalt();
      const userDto = new UserDto(existingUser);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(existingUser.id, tokens.refreshToken);

      logger.info('Пользователь успешно авторизован', { email });

      return { ...tokens, user: userDto };
    } catch (error) {
      logger.error('Ошибка авторизации', { message: error.message, stack: error.stack });

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.InternalServerError('Произошла ошибка при авторизации');
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken, deviceInfo) {
    try {
      const newTokens = await tokenService.refreshTokens(refreshToken, deviceInfo);
      return newTokens;
    } catch (error) {
      logger.error('Ошибка при обновлении токенов', { message: error.message, stack: error.stack });

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.InternalServerError('Произошла ошибка при обновлении токенов');
    }
  }

}

module.exports = new UserService();
