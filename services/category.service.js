const Category = require('../models/Category');

exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
}

exports.getCategoriesService = async () => {
    const categories = await Category.find({});
    return categories;
}

exports.getCategoryByIdService = async (id) => {
    const category = await Category.find({ _id: id });
    return category;
}

exports.updateCategoryService = async (id, data) => {
    const result = await Category.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}

exports.deleteCategoryService = async (id) => {
    const result = await Category.deleteOne({ _id: id });
    return result;
}