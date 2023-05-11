const User = require("../models/User")

exports.createUserService = async (data) => {
    const user = await User.create(data);
    return user;
}

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
}