const express = require('express');
const router = express.Router()
const productController = require('../controllers/product.controller');

const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

// router.use(verifyToken);

router.post('/file-upload', uploader.single('image'), productController.fileUpload);
router.post('/files-upload', uploader.array('image', 3), productController.filesUpload);

router.route('/bulk-update').patch(productController.bulkUpdateProduct)
router.route('/bulk-delete').delete(productController.bulkDeleteProduct)

router.route('/')
    .get(productController.getProducts)
    .post(verifyToken, authorization("admin"), productController.createProduct)

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router