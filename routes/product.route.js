const express = require('express');
const router = express.Router()
const productController = require('../controllers/product.controller');

const uploader = require('../middleware/uploader');

router.post('/file-upload', uploader.single('image'), productController.fileUpload);
router.post('/files-upload', uploader.array('image', 3), productController.filesUpload);

router.route('/bulk-update').patch(productController.bulkUpdateProduct)
router.route('/bulk-delete').delete(productController.bulkDeleteProduct)

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router