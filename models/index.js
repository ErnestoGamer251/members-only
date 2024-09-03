const { Sequelize } = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Message = require('./message')(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Message,
};

User.associate(db);
Message.associate(db);

module.exports = db;
