const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_JWT_SEED;

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      secret,
      {
        expiresIn: '12h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('There was a problem generating token');
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
