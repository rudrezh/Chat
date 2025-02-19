const express = require("express");
const sendMessage = require("../controllers/messagecontroller");
const protectRoute = require("../middleware/protectroute");

const router = express.Router();

router.post("/send/:id",protectRoute,sendMessage);

module.exports = router;