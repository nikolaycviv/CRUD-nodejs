'use strict';

var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', user_controller.welcome);

router.get('/users', user_controller.all_users_details);
router.post('/users', user_controller.user_create);
router.get('/users/:id', user_controller.user_details);
router.put('/users/:id', user_controller.user_update);
router.delete('/users/:id', user_controller.user_delete);

module.exports = router;
