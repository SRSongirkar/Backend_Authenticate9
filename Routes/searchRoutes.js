const express = require('express');
const router = express.Router();
const SearchController = require('../Controllers/searchController');
const authMiddleware = require('../Middleware/authMiddleware');

//Search Controller
router.get('/searchByName/:name',authMiddleware, SearchController.searchByName);
router.get('/searchByPhoneNumber/:phoneNumber',authMiddleware, SearchController.searchByNumber);

module.exports = router;