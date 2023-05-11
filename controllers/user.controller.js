const User = require("../models/User");
const { createUserService, findUserByEmail } = require("../services/user.service");

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

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: 'fail',
                error: `Please provide your credentials`
            })
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                error: `No user found. Please create an account`
            })
        }

        const isValidPassword = User.comparePassword(password, user.password);

        if (!isValidPassword) {
            return res.status(403).json({
                status: 'fail',
                error: `Password is not correct`
            })
        }

        if (user.status != 'active') {
            return res.status(401).json({
                status: 'fail',
                error: `Your account is not active yet`
            })
        }


        res.status(200).json({
            status: 'success',
            message: 'Successfully login'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't login",
            error: `${error.message}`
        })
    }
}