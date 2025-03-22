const express = require("express");
const router = express.Router();
const { handler } = require("../controllers/mail.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/handler", handler);
// router.post("/handler", verifyToken, handler);

module.exports = router;
