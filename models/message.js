const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Message = sequelize.define('Message', {
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Message.associate = (models) => {
  Message.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = Message;
