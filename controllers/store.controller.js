const { createStoreSesrvice, getStoresService, getStoreByIdService, updateStoreService, deleteStoreService } = require("../services/store.service");

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreSesrvice(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Successfully created the store',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't create Store",
            error: `${error.message}`
        })
    }
}

exports.getStores = async (req, res, next) => {
    try {
        const stores = await getStoresService();
        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: stores
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Data not found",
            error: `${error.message}`
        })
    }
}

exports.getStoreById = async (req, res, next) => {
    try {
        const { id } = req.params
        const store = await getStoreByIdService(id);

        if (!store) {
            return res.status(400).json({
                status: 'fail',
                error: "Data not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Data found successfully',
            data: store
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Data not found",
            error: `${error.message}`
        })
    }
}

exports.updateStore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStoreService(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Store update successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't update store",
            error: `${error.message}`
        })
    }
}

exports.deleteStore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteStoreService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'fail',
                error: "Can't Delete store"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Store delete successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't Delete store",
            error: `${error.message}`
        })
    }
}