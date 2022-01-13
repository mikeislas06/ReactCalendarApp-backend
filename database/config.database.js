const mongoose = require('mongoose');

const DB_CNN = process.env.DB_CNN;

const dbConnection = async () => {
  try {
    mongoose.connect(DB_CNN);
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing database');
  }
};

module.exports = {
  dbConnection,
};
