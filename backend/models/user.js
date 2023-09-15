const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = User;
const Album = require('../models/album');
const album_shared_with = require("./album_shared_with");
const Permission = require("../models/permission")


User.hasMany(Album, { foreignKey: 'owner_id' });
User.hasMany(album_shared_with, { foreignKey: 'user_id' })
User.hasMany(Permission, { foreignKey: 'user_id' })