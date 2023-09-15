const { error, log } = require("console");
const Photo = require("../models/photo");
const multer = require("multer");
const path = require("path");
const Album = require("../models/album");
const User = require("../models/user");
const sharp = require('sharp');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
exports.addPhoto = async (req, res) => {
  try {
    const albumId = req.params.id;

    // Use upload.array middleware to handle multiple image uploads
    upload.array('image', 10)(req, res, async (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      if (req.files && req.files.length > 0) {
        const files = req.files;
        console.log(req.files);

        const photos = await Promise.all(
          files.map(async (file) => {
            const { originalname, filename, path } = file;
            // Resize the uploaded image to your desired sizes (e.g., GFG and logo)
            const gfgImagePath = 'uploads/gfg-' + filename;
            const logoImagePath = 'uploads/logo-' + filename;

            await Promise.all([
              sharp(file.path)
                .resize({ width: 300 })
                .toFile(gfgImagePath),
              sharp(file.path)
                .resize({ width: 100 })
                .toFile(logoImagePath),
            ]);

            const photo = await Photo.create({
              album_id: albumId,
              image: filename,
              owner_name: req.user.username,
              gfg_path: filename,
              logo_path: filename,
            });

            return {
              id: photo.id,
              image: photo.image,
              owner_name: photo.owner_name,
              gfg_path: photo.gfg_path,
              logo_path: photo.logo_path,
            };
          })
        );

        return res.status(200).json({
          success: true,
          photos,
          message: "Photos uploaded successfully",
        });
      }

      return res.status(400).json({
        success: false,
        message: "No files were uploaded",
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.deletePhoto = (req, res) => {
  try {
    const id = req.params.id;
    const photo = Photo.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Photo delete succesfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllPhoto = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("hii");
    console.log(id);
    const count = await Photo.count({
      where: {
        album_id: id,
      },

    })
    const photo = await Photo.findAll({
      where: {
        album_id: id,
      },
      include: [
        {
          model: Album,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    if (photo.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No Photo available for this album",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Photo fethched successfully",
      photo,
      count
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getPhoto = async (req, res) => {
  try {
    const id = req.params.id;

    const photo = await Photo.findOne({
      where: {
        id: id,
      },
      include: [Album]
    });
    res.status(200).json({
      success: true,
      photo,
      message: "Photo fetched succesfully"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }

};

exports.update = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);
    const id = req.params.id;
    const respose = Photo.update(req.body, {
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: "updated succesfully",
      respose

    })


  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })

  }

}

exports.getAllPhotoshared = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const photo = await Photo.findAll({
      where: {
        album_id: id,
        approval: true,

      },
      include: [
        {
          model: Album,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    if (photo.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No Photo available for this album",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Photo fethched successfully",
      photo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addPhotoShared = async (req, res) => {
  try {
    const albumId = req.params.id;

    // Use upload.array middleware to handle multiple image uploads
    upload.array('image', 10)(req, res, async (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      if (req.files && req.files.length > 0) {
        const files = req.files;
        console.log(req.files);

        const photos = await Promise.all(
          files.map(async (file) => {
            const { originalname, filename, path } = file;
            // Resize the uploaded image to your desired sizes (e.g., GFG and logo)
            const gfgImagePath = 'uploads/gfg-' + filename;
            const logoImagePath = 'uploads/logo-' + filename;

            await Promise.all([
              sharp(file.path)
                .resize({ width: 300 })
                .toFile(gfgImagePath),
              sharp(file.path)
                .resize({ width: 100 })
                .toFile(logoImagePath),
            ]);

            const photo = await Photo.create({
              album_id: albumId,
              image: filename,
              approval: false,
              owner_name: req.user.username,

            });

            return {
              id: photo.id,
              image: photo.image,
              owner_name: photo.owner_name,
              gfg_path: photo.gfg_path,
              logo_path: photo.logo_path,
            };
          })
        );

        return res.status(200).json({
          success: true,
          photos,
          message: "Photos uploaded successfully",
        });
      }

      return res.status(400).json({
        success: false,
        message: "No files were uploaded",
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
