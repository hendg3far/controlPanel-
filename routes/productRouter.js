const router = require('express').Router();
const productController = require('../controllers/productController');
const upload = require('../controllers/uploadController')


router.get('/', productController.get_products)
router.post('/', upload.array('multiImg', 10), productController.save_product)
router.get('/:id', productController.get_product)
router.patch('/:id', productController.update_product)
router.delete('/:id', productController.delete_product)

module.exports = router