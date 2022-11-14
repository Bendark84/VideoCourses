const { Videos } = require('../models/videos.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const videosExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const videos = await Videos.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id, status: 'active' },
  });

  if (!videos) {
    return next(new AppError('videos not found', 404));
  }
  req.videos = videos;
  next();
});

module.exports = {
  videosExists,
};
