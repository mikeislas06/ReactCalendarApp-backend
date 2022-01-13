const { response } = require('express');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_JWT_SEED;

const validateJWT = (req, res = response, next) => {
  // x-token headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token found',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, secret);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
