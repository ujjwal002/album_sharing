const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Photo = sequelize.define("Photo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  approval: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
  owner_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
  },


});


module.exports = Photo;
const Album = require("./album");
Photo.belongsTo(Album, { foreignKey: 'album_id' });

