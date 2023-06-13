export function generateValidPassword() {
    const length = 12;
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()';

    let password = '';

    const getRandomChar = (charSet) => {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet.charAt(randomIndex);
    };

    while (password.length < length) {
      if (password.length < length - 4) {
        password += getRandomChar(lowercaseChars);
      } else if (password.length < length - 3) {
        password += getRandomChar(uppercaseChars);
      } else if (password.length < length - 2) {
        password += getRandomChar(numberChars);
      } else {
        password += getRandomChar(specialChars);
      }
    }

    return password;
};