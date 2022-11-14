const { Categories } = require('./categories.model');
const { Courses } = require('./courses.model');
const { User } = require('./users.model');
const { Videos } = require('./videos.model');

const initModels = () => {
  // M User <------> M Courses
  User.belongsToMany(Courses, {
    through: 'usersCourses',
    foreignKey: 'usersId',
  });
  Courses.belongsToMany(User, {
    through: 'usersCourses',
    foreignKey: 'coursesId',
  });

  //1 Corses <--------> M Categories
  Courses.hasMany(Categories, { foreignKey: 'coursesId' });
  Categories.belongsTo(Courses);

  //1 Courses <-------> M Videos
  Courses.hasMany(Videos, { foreignKey: 'coursesId' });
  Videos.belongsTo(Courses);
};

module.exports = { initModels };
