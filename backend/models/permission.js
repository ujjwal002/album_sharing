const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shared_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

module.exports = Permission;

const User = require('../models/user');
const Album = require("./album");
const album_shared_with = require("./album_shared_with");

Permission.belongsTo(User, { foreignKey: 'user_id' })
Permission.belongsTo(Album, { foreignKey: 'album_id' })
Permission.belongsTo(album_shared_with, { foreignKey: 'shared_id' })
