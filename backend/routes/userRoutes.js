const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/authCtrl");
const auth = require("../middleware/auth");

router.post("/adduser", ctrl.signUp);
router.post("/login", ctrl.login);
router.post("/forgotpassword", ctrl.forgotPassword);
router.post("/resetpassword", ctrl.resetPassword);
router.get('/logout', ctrl.logout)

module.exports = router;
