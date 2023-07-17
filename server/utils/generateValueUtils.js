const crypto = require('crypto');

async function generateUniqueValue() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const salt = buffer.toString('hex');
        resolve(salt);
      }
    });
  });
}
exports.generateUniqueValue = generateUniqueValue;
