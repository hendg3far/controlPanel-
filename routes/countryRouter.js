const router = require('express').Router();
const countryController = require('../controllers/countryController');
const upload = require('../controllers/uploadController');

router.get('/', countryController.get_countries)
router.post('/', upload.single('flag'), countryController.save_country)
router.get('/:id', countryController.get_country)
router.patch('/:id', countryController.update_country)
router.delete('/:id', countryController.delete_country)

module.exports = router