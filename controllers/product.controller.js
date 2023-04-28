const { getProductsService, createProductService, updateProductService, bulkUpdateProductService, deleteProductService, bulkDeleteProductService } = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
    try {
        let filters = { ...req.query }
        const queries = {}

        // sort, page, limit -> exclude
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach(field => delete filters[field]);

        // gt, gte, lt, lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        filters = JSON.parse(filtersString);

        if (req.query.fields) {
            // const fields = req.query.fields.split(',').join(' ');
            const fields = req.query.fields.replaceAll(',', ' ');
            queries.fields = fields
        }

        if (req.query.sort) {
            const sort = req.query.sort.split(',').join(' ');
            queries.sort = sort
        }

        if (req.query.page || req.query.limit) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit)

            queries.skip = skip;
            queries.limit = parseInt(limit)
        }

        const products = await getProductsService(filters, queries);
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

// buld-update
exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Products update successfully',
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

// delete
exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteProductService(id);

        res.status(200).json({
            status: 'success',
            message: 'Product delete successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Couldn\'t delete',
            error: `${error.message}`
        })
    }
}

// buld-delete
exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Products update successfully',
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