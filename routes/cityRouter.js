const router = require('express').Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.get_cities)
router.post('/', cityController.save_city)
router.get('/:id', cityController.get_city)
router.patch('/:id', cityController.update_city)
router.delete('/:id', cityController.delete_city)

module.exports = router