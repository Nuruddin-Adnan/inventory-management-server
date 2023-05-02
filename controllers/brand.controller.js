const { createBrandService, getBrandsService, getBrandByIdService, updateBrandService } = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Successfully created the brand',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't create Brand",
            error: `${error.message}`
        })
    }
}

exports.getBrands = async (req, res, next) => {
    try {
        const filters = { ...req.query }
        const brands = await getBrandsService(filters);
        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: brands
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not found',
            error: `${error.message}`
        })
    }
}

exports.getBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await getBrandByIdService(id);

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'No data found',
            error: `${error.message}`
        })
    }
}

exports.updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateBrandService(id, req.body);

        if (result.modifiedCount === 0) {
            return res.status(400).json({
                status: 'fail',
                error: "Can't update the brand"
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