const { expect } = require('chai');
const sinon = require('sinon');
const UserService = require('../service/user-service');
const { User } = require('../models/user');

describe('UserService', () => {
  describe('registration', () => {
    it('should create a new user', async () => {
      // Создание фейкового пользователя для теста
      const fakeUser = {
        email: 'test@example.com',
        password: 'JFKDSfsdj24!&111',
        firstName: 'John',
      };

      // Создание шпиона для модели User
      const createSpy = sinon.spy(User, 'create');

      // Создание экземпляра UserService
      const userService = new UserService();

      // Вызов метода регистрации
      const user = await userService.registration(
        fakeUser.email,
        fakeUser.password,
        fakeUser.firstName
      );

      // Проверка, что метод User.create был вызван с правильными аргументами
      expect(createSpy.calledOnceWith(fakeUser)).to.be.true;

      // Проверка, что возвращенный пользователь соответствует ожиданиям
      expect(user.email).to.equal(fakeUser.email);
      expect(user.firstName).to.equal(fakeUser.firstName);

      // Восстановление шпиона
      createSpy.restore();
    });
  });
});
