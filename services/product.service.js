const Brand = require("../models/Brand");
const Product = require("../models/Product")

exports.getProductsService = async (filters, queries) => {
    const products = await Product
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sort);

    const total = await Product.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)

    return { total, page, products };
}

exports.createProductService = async (data) => {
    const product = await Product.create(data);

    const { _id: productId, brand } = product

    const res = await Brand.updateOne(
        { _id: brand.id },
        { $push: { products: productId } }
    )

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