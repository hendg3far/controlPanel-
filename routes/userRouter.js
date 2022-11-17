const router = require('express').Router()
const userController = require('../controllers/userController')



router.get('/', userController.get_users)
router.get('/:id', userController.get_user)
router.patch('/:id', userController.update_user)
router.delete('/:id', userController.delete_user)

module.exports = router