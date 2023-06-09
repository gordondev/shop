const argon2 = require('argon2');

class Argon2Utils {
  async hashPassword(password, salt) {
    try {
      const hashedPassword = await argon2.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error('Ошибка хеширования пароля:', error.message);
      throw new Error('Ошибка хеширования пароля');
    }
  }

  async verifyPassword(password, hashedPassword) {
    try {
      const isValid = await argon2.verify(hashedPassword, password);
      return isValid;
    } catch (error) {
      console.error('Ошибка проверки пароля:', error.message);
      throw new Error('Ошибка проверки пароля');
    }
  }

}

module.exports = new Argon2Utils();
