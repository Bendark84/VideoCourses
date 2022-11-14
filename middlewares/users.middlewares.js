const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { Courses } = require('../models/courses.model');
const { UsersCourses } = require('../models/users_courses.model');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  //obtener del usuario los cursos donde esta suscrito
  const user = await User.findOne({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    where: { id, status: 'active' },
    include: { model: Courses, attributes: ['title'] },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
  next();
});

module.exports = {
  userExists,
};
