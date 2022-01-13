const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config.database');

const PORT = process.env.PORT || 9000;

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Public
app.use(express.static('public'));

// Lectura y parse del body
app.use(express.json());

// Rutas
// TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth.routes'));

// TODO: CRUD // Eventos
app.use('/api/events', require('./routes/events.routes'));

// Escuchar peticiones
app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});
