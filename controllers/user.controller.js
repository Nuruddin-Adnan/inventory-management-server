const { createUserService } = require("../services/user.service");

exports.createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req.body);

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                error: "Can't create User"
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Successfully created the user'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't create User",
            error: `${error.message}`
        })
    }
}