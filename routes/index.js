const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/api/upload").post(controllers.upload).post(controllers.addImage);

module.exports = router;
