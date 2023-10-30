console.log("Reached mainRoutes.js");

const express = require('express');
const mainController = require('../controllers/mainController'); 

const router = express.Router();

// GET /main: send about page to user
router.get('/about', mainController.about);

// GET /main/contact: send contact page to user
router.get('/contact', mainController.contact);

module.exports = router;