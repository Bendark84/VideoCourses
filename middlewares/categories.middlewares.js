const { Categories } = require('../models/categories.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const categoriesExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const categories = await Categories.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id, status: 'active' },
  });

  if (!categories) {
    return next(new AppError('categories not found', 404));
  }
  req.categories = categories;
  next();
});

module.exports = {
  categoriesExists,
};
