const express = require('express');

const {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

//Middleware
const { userExists } = require('../middlewares/users.middlewares');

const {
  createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRoutes = express.Router();

usersRoutes.post('/', createUserValidators, createUser);

// usersRoutes.get('/', getAllUser);
usersRoutes.get('/:id', userExists, getOneUser);

usersRoutes.patch('/:id', userExists, updateUser);
usersRoutes.delete('/:id', userExists, deleteUser);

module.exports = { usersRoutes };
