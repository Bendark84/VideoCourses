const express = require('express');

const { categoriesExists } = require('../middlewares/categories.middlewares');
const {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require('../controllers/categories.controller');

const categoriesRoutes = express.Router();

// categoriesRoutes.get('/', getAllCategories);
categoriesRoutes.post('/', createCategories);
// categoriesRoutes.patch('/:id', categoriesExists, updateCategories);
categoriesRoutes.delete('/:id', categoriesExists, deleteCategories);

module.exports = { categoriesRoutes };
