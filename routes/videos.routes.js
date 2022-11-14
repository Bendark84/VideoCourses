const express = require('express');

const {
  getAllVideos,

  createVideos,
  updateVideos,
  deleteVideos,
} = require('../controllers/videos.controller');

const { videosExists } = require('../middlewares/videos.middlewares');

const videosRoutes = express.Router();

// videosRoutes.get('/', getAllVideos);

videosRoutes.post('/', createVideos);
// videosRoutes.patch('/:id', videosExists, updateVideos);
videosRoutes.delete('/:id', videosExists, deleteVideos);

module.exports = { videosRoutes };
