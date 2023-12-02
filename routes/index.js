const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const habitController = require('../controllers/habit_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/habit', require('./habit'));
router.use('/habitStatus', habitController.updateHabit);


module.exports = router;