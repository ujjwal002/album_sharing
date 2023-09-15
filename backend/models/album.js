const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Album = sequelize.define("Album", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("public", "private"),
    defaultValue: "public",
  },
});



module.exports = Album;

const Photo = require("./photo");
const User = require('../models/user')
const album_shared_with = require('../models/album_shared_with')
const Permission = require("../models/permission")


Album.belongsTo(User, { foreignKey: 'owner_id' });
Album.hasMany(Photo, { foreignKey: 'album_id', onDelete: 'CASCADE' });
Album.hasMany(album_shared_with, { foreignKey: 'album_id' })
Album.hasOne(Permission, { foreignKey: 'album_id' });
