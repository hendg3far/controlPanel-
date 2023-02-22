const router = require('express').Router()
const settingController = require('../controllers/settingController')


router.post('/', settingController.save_setting)
router.get('/', settingController.get_setting)
router.patch('/:id', settingController.update_setting)

module.exports = router