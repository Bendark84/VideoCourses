const dotenv = require('dotenv');

//Models
const { Videos } = require('../models/videos.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const getAllVideos = catchAsync(async (req, res, next) => {
  const videos = await Videos.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { status: 'active' },
  });

  res.status(200).json({
    status: 'success',
    data: { videos },
  });
  next();
});

const createVideos = catchAsync(async (req, res, next) => {
  const { title, url, coursesId } = req.body;

  const newVideos = await Videos.create({
    title,
    url,
    coursesId,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  res.status(201).json({
    status: 'success',
    data: { newVideos },
  });
  next();
});

const updateVideos = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { videos } = req;

  await videos.update({ title });

  res.status(200).json({
    status: 'success',
    data: { videos },
  });
  next();
});

const deleteVideos = catchAsync(async (req, res, next) => {
  const { videos } = req;

  await videos.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
  next();
});

module.exports = {
  getAllVideos,
  createVideos,
  updateVideos,
  deleteVideos,
};
