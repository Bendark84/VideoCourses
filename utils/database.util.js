const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
//Establecer la conexion a la base de datos

dotenv.config({ path: './config.env' });

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB,
  logging: false,
});

module.exports = { db, DataTypes };
