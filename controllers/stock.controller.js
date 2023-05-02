const { getStocksService, createStockService, updateStockService, bulkUpdateStockService, deleteStockService, bulkDeleteStockService } = require("../services/stock.service");

exports.getStocks = async (req, res, next) => {
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

        const stocks = await getStocksService(filters, queries);
        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: stocks
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not found',
            error: `${error.message}`
        })
    }
}

exports.getStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const stock = await getStockByIdService(filters, queries);

        if (!stock) {
            return res.status(400).json({
                status: 'fail',
                message: 'Data not found',
                error: `${error.message}`
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: stock
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
exports.createStock = async (req, res, next) => {
    try {
        const result = await createStockService(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Successfully created Stock',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not created',
            error: `${error.message}`
        })
    }
}

// update
exports.updateStock = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await updateStockService(id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Stock update successfully',
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

// bulk-update
exports.bulkUpdateStock = async (req, res, next) => {
    try {
        const result = await bulkUpdateStockService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Stocks update successfully',
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
exports.deleteStock = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteStockService(id);

        res.status(200).json({
            status: 'success',
            message: 'Stock delete successfully',
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

// bulk-delete
exports.bulkDeleteStock = async (req, res, next) => {
    try {
        const result = await bulkDeleteStockService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Stocks update successfully',
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

// // image upload
// exports.fileUpload = async (req, res, next) => {
//     try {
//         res.status(200).json(req.file)
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: 'Couldn\'t upload the file',
//             error: `${error.message}`
//         })
//     }
// }

// // multiple image upload
// exports.filesUpload = async (req, res, next) => {
//     try {
//         res.status(200).json(req.files)
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: 'Couldn\'t upload the file',
//             error: `${error.message}`
//         })
//     }
// }