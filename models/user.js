const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  isMember: { type: DataTypes.BOOLEAN, defaultValue: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

User.associate = (models) => {
  User.hasMany(models.Message, { foreignKey: 'userId' });
};

module.exports = User;
