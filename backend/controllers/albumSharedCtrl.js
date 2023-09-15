const album_shared_with = require('../models/album_shared_with')

exports.sharedAlbum = (req, res) => {
  try {
    const sharedAlbum = album_shared_with

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })

  }
}
exports.permission = (req, res) => {
  try {

  } catch (error) {

  }
}