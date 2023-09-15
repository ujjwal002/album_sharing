const ctrl = require("../controllers/photoCtrl");
const express = require("express");

const router = express.Router();
const { auth } = require("../middleware/auth");

router.post('/addImage/:id', auth, ctrl.addPhoto)
router.post('/addPhotoShared/:id', auth, ctrl.addPhotoShared)

router.delete('/deleteImage/:id', auth, ctrl.deletePhoto)
router.get('/getImage/:id', auth, ctrl.getAllPhoto)
router.get('/getOneImage/:id', auth, ctrl.getPhoto)
router.patch('/updateimage/:id', auth, ctrl.update)
router.get('/getAllPhotoshared/:id', auth, ctrl.getAllPhotoshared)


module.exports = router;


