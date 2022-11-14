const dotenv = require('dotenv');

//Models
const { Courses } = require('../models/courses.model');
const { Categories } = require('../models/categories.model');
const { Videos } = require('../models/videos.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { UsersCourses } = require('../models/users_courses.model');

dotenv.config({ path: './config.env' });

const getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Courses.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { status: 'active' },
    include: { model: Categories, attributes: ['name'] },
    include: { model: Videos, attributes: ['title', 'url'] },
  });

  //! falta incluir la categoria
  res.status(200).json({
    status: 'success',
    data: { courses },
  });
  next();
});

const createCoursesId = catchAsync(async (req, res, next) => {
  const { title, description, instructor } = req.body;

  const newCourses = await Courses.create({
    title,
    description,
    instructor,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  res.status(201).json({
    status: 'success',
    data: { newCourses },
  });
  next();
});

const updateCourses = catchAsync(async (req, res, next) => {
  const { description } = req.body;
  const { courses } = req;

  await courses.update({ description });

  res.status(200).json({
    status: 'success',
    data: { courses },
  });
  next();
});

const deleteCourses = catchAsync(async (req, res, next) => {
  const { courses } = req;

  await courses.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
  next();
});

module.exports = {
  getAllCourses,
  createCoursesId,
  updateCourses,
  deleteCourses,
};
