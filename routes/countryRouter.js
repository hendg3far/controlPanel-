const router = require('express').Router()
const countryController = require('../controllers/countryController')

router.get('/', countryController.get_countries)
router.post('/', countryController.save_country)
router.get('/:id', countryController.get_country)
router.patch('/:id', countryController.update_country)
router.delete('/:id', countryController.delete_country)

module.exports = router