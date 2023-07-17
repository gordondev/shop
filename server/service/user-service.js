const { User } = require('../models/user-model');
const argon2Utils = require('../utils/argon2Utils');
const ApiError = require('../exceptions/api-error');
const logger = require('../utils/logger');
const { generateUniqueValue } = require('../utils/generateValueUtils');
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const { InternalServerError } = require('../exceptions/api-error');

class UserService {
  async checkExistingUser(email) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.warn('Пользователь с такой почтой уже существует', { email });
      throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
    }
  }

  async checkExistingUserForLogin(email) {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      logger.warn('Пользователь не был найден', { email });
      throw ApiError.BadRequest('Пользователь не был найден');
    }
    return existingUser;
  }

  async hashPassword(password, salt) {
    return await argon2Utils.hashPassword(password, salt);
  }

  async verifyPassword(password, hashedPassword) {
    return await argon2Utils.verifyPassword(password, hashedPassword);
  }

  async createUser(email, hashedPassword, nickname) {
    return await User.create({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  async isNicknameUnique(nickname) {
    const existingUser = await User.findOne({ where: { nickname } });
    return !existingUser;
  }

  async generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  
  async generateUniqueNickname() {
    const randomString = await this.generateRandomString(10);
    const nickname = `User-${randomString}`;
  
    const isUnique = await this.isNicknameUnique(nickname);
    if (!isUnique) {
      return this.generateUniqueNickname();
    }
  
    return nickname;
  }

  async registration(email, password, deviceInfo) {
    try {
      await this.checkExistingUser(email);

      const salt = await generateUniqueValue();
      const sessionID = await generateUniqueValue();
      const hashedPassword = await this.hashPassword(password, salt);
      const nickname = await this.generateUniqueNickname();

      const user = await this.createUser(email, hashedPassword, nickname);
      
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken, deviceInfo, sessionID);

      logger.info('Пользователь успешно зарегистрирован', { email, nickname });

      return { ...tokens, user: userDto, sessionID };
    } catch (error) {
      logger.error('Ошибка при регистрации пользователя', { message: error.message, stack: error.stack });

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.InternalServerError('Произошла ошибка при регистрации пользователя');
    }
  }

  async login(email, password, deviceInfo) {
    try {
      const existingUser = await this.checkExistingUserForLogin(email);
      const isPassEquels = await this.verifyPassword(password, existingUser.password);

      if (!isPassEquels) {
        logger.warn('Неверный пароль', { email });
        throw ApiError.InternalServerError('Неверный пароль');
      }

      const sessionID = await generateUniqueValue();
      const userDto = new UserDto(existingUser);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(existingUser.id, tokens.refreshToken, deviceInfo, sessionID);

      logger.info('Пользователь успешно авторизован', { email });

      return { ...tokens, user: userDto, sessionID };
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

  async refresh(refreshToken, deviceInfo, sessionID) {
    try {
      const newTokens = await tokenService.refreshTokens(refreshToken, deviceInfo, sessionID);
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
