const router = require('express').Router()
const authController = require('../controllers/authController')

router.post('/register', authController.sign_up)
router.post('/login', authController.sign_in)

module.exports = router