const { createCategoryService, getCategoriesService, getCategoryByIdService, updateCategoryService, deleteCategoryService } = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Successfully created the category',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't create Category",
            error: `${error.message}`
        })
    }
}

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await getCategoriesService();

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: categories
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Data not found",
            error: `${error.message}`
        })
    }
}

exports.getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryByIdService(id);

        if (category.length === 0) {
            return res.status(400).json({
                status: 'fail',
                error: 'No data found'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'No data found',
            error: `${error.message}`
        })
    }
}


exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateCategoryService(id, req.body);

        if (result.modifiedCount === 0) {
            return res.status(400).json({
                status: 'fail',
                error: "Can't update the category"
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
            message: "Can't update the category",
            error: `${error.message}`
        })
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteCategoryService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'fail',
                error: "Can't delete category"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted',
            result: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't delete category",
            error: `${error.message}`
        })
    }
}