const { getProductsService, createProductService, updateProductService } = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
    try {
        const products = await getProductsService();
        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not found',
            error: `${error.message}`
        })
    }
}

// posting to database using create method
exports.createProduct = async (req, res, next) => {
    try {
        const result = await createProductService(req.body)
        result.logger();
        res.status(200).json({
            status: 'success',
            message: 'Successfully inserted product',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: `${error.message}`
        })
    }
}

// update
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await updateProductService(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Product update successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Couldn\'t update',
            error: `${error.message}`
        })
    }
}