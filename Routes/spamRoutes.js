const express = require("express");
const router = express.Router();
const SpamController = require("../Controllers/spamController");
const authMiddleware = require('../Middleware/authMiddleware');

// Spam Routes
router.post("/markAsSpam",authMiddleware, SpamController.markAsSpam);
router.get("/getSpamReports/:userId", authMiddleware,SpamController.getSpamReports);

module.exports = router;
