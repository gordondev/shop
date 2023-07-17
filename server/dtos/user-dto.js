module.exports = class UserDto {
  email;
  id;
  nickname;
  isBlocked;
  role;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.nickname = model.nickname;
    this.isBlocked = model.isBlocked;
    this.role = model.role;
  }
};
