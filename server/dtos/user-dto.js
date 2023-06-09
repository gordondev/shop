module.exports = class UserDto {
  email;
  id;
  firstName;
  surname;
  secondName;
  isBlocked;
  role;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.firstName = model.firstName;
    this.surname = model.surname;
    this.secondName = model.secondName;
    this.isBlocked = model.isBlocked;
    this.role = model.role;
  }
};
