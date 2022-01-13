/*
  Rutas de Usuarios / auth
  host + /api/events
*/

const express = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt-middleware');

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events.controllers');
const { isDate } = require('../helpers/isDate');

const router = express.Router();

// Todas deben pasar por la validacion del JWT
router.use(validateJWT);

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'Title is mandatory').not().isEmpty(),
    check('start', 'Start date is mandatory').custom(isDate),
    check('end', 'End date is mandatory').custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
