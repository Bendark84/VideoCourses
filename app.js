const express = require('express');

//Rotues

const { usersRoutes } = require('./routes/user.routes');
const { categoriesRoutes } = require('./routes/categories.routes');
const { coursesRoutes } = require('./routes/courses.routes');
const { videosRoutes } = require('./routes/videos.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();

app.use(express.json());

//Endpoints

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/videos', videosRoutes);

// Global error handler
app.use(globalErrorHandler);

//Catch non-existing endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
