/*
  Rutas de Usuarios / auth
  host + /api/auth
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  createUser,
  loginUser,
  renewToken,
} = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt-middleware');

// Auth Routes
router.get('/', (req, res) => {
  res.json({
    ok: true,
  });
});

router.post(
  '/',
  [
    // middlewares
    check('email', 'Email is mandatory').isEmail(),
    check(
      'password',
      'Password is mandatory and must be at least 6 characters'
    ).isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

router.post(
  '/new',
  [
    // middlewares
    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').isEmail(),
    check(
      'password',
      'Password is mandatory and must be at least 6 characters'
    ).isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
