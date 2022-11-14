const dotenv = require('dotenv');

//Models
const { Categories } = require('../models/categories.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Categories.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { status: 'active' },
  });

  res.status(200).json({
    status: 'success',
    data: { categories },
  });
  next();
});

const createCategories = catchAsync(async (req, res, next) => {
  const { name, coursesId } = req.body;

  const newCategories = await Categories.create({
    name,
    coursesId,
  });

  res.status(201).json({
    status: 'success',
    data: { newCategories },
  });
  next();
});

const updateCategories = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { categories } = req;

  await categories.update({ name });

  res.status(200).json({
    status: 'success',
    data: { categories },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  next();
});

const deleteCategories = catchAsync(async (req, res, next) => {
  const { categories } = req;

  await categories.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
  next();
});

module.exports = {
  createCategories,
  getAllCategories,
  updateCategories,
  deleteCategories,
};
