const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/signup', formController.handleSignup);

module.exports = router;