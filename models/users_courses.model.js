const { db, DataTypes } = require('../utils/database.util');

const UsersCourses = db.define('usersCourses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usersId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coursesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { UsersCourses };
