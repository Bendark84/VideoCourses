const express = require('express');

const {
  getAllCourses,
  createCoursesId,
  updateCourses,
  deleteCourses,
} = require('../controllers/courses.controller');
const { coursesExists } = require('../middlewares/courses.middlewares');

const coursesRoutes = express.Router();

coursesRoutes.get('/', getAllCourses);
coursesRoutes.post('/', createCoursesId);
coursesRoutes.patch('/:id', coursesExists, updateCourses);
// coursesRoutes.delete('/:id', coursesExists, deleteCourses);

module.exports = { coursesRoutes };
