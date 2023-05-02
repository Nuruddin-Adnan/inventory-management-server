const { createSupplierService, getSuppliersService, getSupplierByIdService, updateSupplierService } = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Successfully created the supplier',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't create Supplier",
            error: `${error.message}`
        })
    }
}

exports.getSuppliers = async (req, res, next) => {
    try {
        const filters = { ...req.query }
        const suppliers = await getSuppliersService(filters);
        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: suppliers
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not found',
            error: `${error.message}`
        })
    }
}

exports.getSupplierById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const supplier = await getSupplierByIdService(id);

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: supplier
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'No data found',
            error: `${error.message}`
        })
    }
}

exports.updateSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateSupplierService(id, req.body);

        if (result.modifiedCount === 0) {
            return res.status(400).json({
                status: 'fail',
                error: "Can't update the supplier"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Data update successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't update the brand",
            error: `${error.message}`
        })
    }
}