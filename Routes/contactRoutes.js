const express = require("express");
const router = express.Router();
const ContactController = require("../Controllers/contactController");
const authMiddleware = require('../Middleware/authMiddleware');
// Contact Routes
router.post("/addContact", authMiddleware,ContactController.addContact);
router.get("/getContacts/:userId", authMiddleware,ContactController.getContacts);

module.exports = router;
