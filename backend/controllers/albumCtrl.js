const Album = require("../models/album");
const Photo = require('../models/photo')
const album_shared_with = require('../models/album_shared_with')
const multer = require('multer');
const sendEmail = require('../service/albumSharingService')
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const User = require("../models/user");
const Permission = require("../models/permission")

exports.addAlbum = async (req, res) => {
  try {
    const { title, status } = req.body;
    console.log("hello");
    console.log(title, status);
    console.log(req.body);
    const owner_id = req.user.id;

    const album = await Album.create({
      owner_id,
      title,
      status,
    });
    return res.status(200).json({
      success: true,
      message: "album created succesfully"
    })


  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.showAlbums = async (req, res) => {
  try {
    const defaultPage = 1;
    const defaultLimit = 8;
    const page = parseInt(req.query.page) || defaultPage;
    const limit = parseInt(req.query.limit) || defaultLimit;
    const search = req.query.search || '';

    const offset = (page - 1) * limit;

    const whereClause = {
      owner_id: req.user.id,
    };
    console.log(whereClause);

    if (search) {
      whereClause.title = { [Sequelize.Op.like]: `%${search.trim()}%` };
    }
    console.log(search);

    const albums = await Album.findAll({
      where: {
        [Op.and]: [
          { status: "public" },
          { title: { [Op.like]: `%${search.trim()}%` } }
        ]
      },
      limit: limit,
      offset: offset,
    });

    if (albums.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No albums found",
        albums
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched data successfully",
      albums,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.showOwnerAlbums = async (req, res) => {
  try {
    const defaultPage = 1;
    const defaultLimit = 4;
    const page = parseInt(req.query.page) || defaultPage;
    const limit = parseInt(req.query.limit) || defaultLimit;
    const search = req.query.search || '';
    console.log(search);

    const count = await Album.count({
      where: {
        owner_id: req.user.id,

      },

    })

    const offset = (page - 1) * limit;
    if (search === '') {
      const albums = await Album.findAll({
        where: {
          owner_id: req.user.id,

        },
        limit: limit,
        offset: offset,
      });
      console.log(albums);
      return res.status(200).json({
        success: true,
        message: "Fetched data successfully",
        albums,
        count,
        page,
        limit,
      });

    }
    else {
      const albums = await Album.findAll({
        where: {
          [Op.and]: [
            {
              owner_id: req.user.id,
            },
            { title: { [Op.like]: `%${search.trim()}%` } }
          ]
        },
        limit: limit,
        offset: offset,

      });
      console.log(albums);
      if (albums.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No albums found",
          albums
        });
      }
      const count = albums.length;
      return res.status(200).json({
        success: true,
        message: "Fetched data successfully",
        albums,
        count,
        page,
        limit,
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.showThisAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const ThisAlbum = await Album.findOne({
      where: {
        id: id
      },
      include: [Photo]
    });
    if (!ThisAlbum) {
      return res.status(400).json({
        success: false,
        message: "Sorry no album is present for this user"
      })

    }
    return res.status(200).json({
      success: true,
      message: "Succesfully fetched this album",
      ThisAlbum
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })

  }
}
exports.updateAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const { title, status } = req.body;
    const album = await Album.findByPk(albumId);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'Album not found'
      });
    }

    album.title = title;
    album.status = status;

    await album.save();

    return res.status(200).json({
      success: true,
      message: 'Album updated successfully',
      album
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the album'
    });
  }
}
exports.deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    const album = await Album.findOne({
      where: {
        id: id
      }
    });

    if (!album) {
      return res.status(400).json({
        success: true,
        message: "Album can't find"
      })
    }
    await Photo.destroy({
      where: {
        album_id: id
      }
    });

    await album_shared_with.destroy({
      where: {
        album_id: id
      }
    })

    await Album.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).json({
      success: true,
      message: "Successfullly deleted the album"
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
exports.shareAlbums = async (req, res) => {
  try {
    console.log(req.body);
    try {
      const { email, permission, album_id, user_id } = req.body;
      const owner_id = req.user.id;

      await sendEmail(email, owner_id)
      const Shared = album_shared_with.create(req.body)
      return res.status(200).json({
        success: true,
        message: "email send to all successfully"
      })

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })

    }

  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "here is error"
    })

  }

}
exports.getAllshared = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const email = req.user.email;
    const respose = await album_shared_with.findAll({
      where: {
        email: email
      },
      include: [Album, User]

    })
    console.log(respose);
    return res.status(200).json({
      success: true,
      respose,
      message: "Succesfully fetched shared album"
    })

  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error.message
    })
  }
}
exports.permission = (req, res) => {
  try {
    console.log(req.body);
    const response = Permission.create(req.body)
    if (response) {
      return res.status(200).json({
        success: true,
        message: "permission created"
      })
    }


  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })

  }
}
exports.getPermission = async (req, res) => {

  try {
    const owner_id = req.body;

    const response = await Permission.findAll({
      where: {
        user_id: req.user.id
      },
      include: [Album, User, album_shared_with]
    })
    return res.status(200).json({
      success: true,
      response,
      message: "fetched successfully"
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })

  }

}
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);

    const [updatedRows] = await album_shared_with.update(
      { permission: true },
      {
        where: {
          id: id
        }
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Permission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deletePermission = async (req, res) => {
  try {
    const id = req.params.id
    console.log(req.body);
    const deletedRows = await Permission.destroy({
      where: {
        id: id
      }
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Permission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Permission deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
