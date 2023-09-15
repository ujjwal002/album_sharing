const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('../models/user')
const album_shared_with = sequelize.define("album_shared_with", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permission: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
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

module.exports = album_shared_with;

const Permission = require("../models/permission")


const Album = require('../models/album');
album_shared_with.belongsTo(Album, { foreignKey: 'album_id' });
album_shared_with.belongsTo(User, { foreignKey: 'user_id' })
album_shared_with.hasOne(Permission, { foreignKey: 'shared_id' })


