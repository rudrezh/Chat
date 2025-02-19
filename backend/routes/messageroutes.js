const express = require("express");
const {sendMessage,getMessage} = require("../controllers/messagecontroller");
const protectRoute = require("../middleware/protectroute");

const router = express.Router();

router.post("/send/:id",protectRoute,sendMessage);
router.get("/:id",protectRoute,getMessage);

module.exports = router;