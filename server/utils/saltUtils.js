const crypto = require('crypto');

async function generateSalt() {
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

module.exports = generateSalt;
