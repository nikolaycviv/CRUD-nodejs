const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/', userController.welcome)

router.get('/users', userController.allUsersDetails)
router.post('/users', userController.userCreate)
router.get('/users/:id', userController.userDetails)
router.put('/users/:id', userController.userUpdate)
router.delete('/users/:id', userController.userDelete)

module.exports = router
