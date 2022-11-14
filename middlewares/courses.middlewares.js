const { Courses } = require('../models/courses.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const coursesExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const courses = await Courses.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id, status: 'active' },
  });

  if (!courses) {
    return next(new AppError('Courses not found', 404));
  }
  req.courses = courses;
  next();
});

module.exports = {
  coursesExists,
};
