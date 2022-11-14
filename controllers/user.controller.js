const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/users.model');
const { Courses } = require('../models/courses.model');
const { UsersCourses } = require('../models/users_courses.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    where: { status: 'active' },
    include: { model: Courses, attributes: ['title'] },
  });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
  next();
});

//TODO generar que se muestre los cursos que esta mirando
//Obtener un usuario con el nombre del curso
const getOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    data: { user },
  });
  next();
});

const createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, coursesId } = req.body;

  //Encrypt password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    attributes: { exclude: ['updatedAt', 'createdAT'] },
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  //Remove pass from responce
  newUser.password = undefined;

  await UsersCourses.create({ coursesId, usersId: newUser.id });

  res.status(201).json({
    status: 'success',
    data: { newUser },
  });
  next();
});

const updateUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, password } = req.body;
  const { user } = req;

  await user.update({ firstName, lastName, password });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
  next();
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
  next();
});

// const login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({
//     where: { email, status: 'active' },
//   });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return next(new AppError('Wrong credentials', 400));
//   }

//   user.password = undefined;

//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   res.status(200).json({
//     status: 'success',
//     data: { user, token },
//   });
//   next();
// });

module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
