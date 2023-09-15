const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/albumCtrl");
const { auth } = require("../middleware/auth");

router.post("/addalbum", auth, ctrl.addAlbum);
router.get("/getAlbum", auth, ctrl.showAlbums);
router.get("/getthisalbum/:id", ctrl.showThisAlbum)
router.delete("/deleteAlbum/:id", auth, ctrl.deleteAlbum);
router.patch("/updatealbum/:id", auth, ctrl.updateAlbum);
router.post("/sharealbum", auth, ctrl.shareAlbums)
router.get("/getAllshared/:id", auth, ctrl.getAllshared)
router.get("/showOwnerAlbums", auth, ctrl.showOwnerAlbums)
router.post("/permission", auth, ctrl.permission)
router.get("/getPermission", auth, ctrl.getPermission)
router.patch("/updatePermission", auth, ctrl.updatePermission)
router.delete("/deletePermission/:id", auth, ctrl.deletePermission)

module.exports = router;
