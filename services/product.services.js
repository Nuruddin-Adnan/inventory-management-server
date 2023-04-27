const Product = require("../models/Product")

exports.getProductsService = async (filters, queries) => {
    const products = await Product
        .find(filters)
        .select(queries.fields)
        .sort(queries.sort)
        .limit(queries.limit);

    return products;
}

exports.createProductService = async (data) => {
    const product = await Product.create(data);
    return product;
}

exports.updateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, {
        runValidators: true
    })
    return result
}

exports.bulkUpdateProductService = async (data) => {
    const products = [];

    data.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data), {
            runValidators: true
        })
    });

    const result = await Promise.all(products)
    return result;
}

exports.deleteProductService = async (id) => {
    const result = await Product.deleteOne({ _id: id })
    return result
}

exports.bulkDeleteProductService = async (ids) => {
    const result = await Product.deleteMany({ _id: ids })
    return result
}