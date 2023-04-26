const Product = require("../models/Product")

exports.getProductsService = async () => {
    // const products = await Product
    // .where("name").equals("chal")
    // .where("price").gte(200)
    // .where("status").ne("out-of-stock")

    const products = await Product.find({})

    return products;
}

exports.createProductService = async (data) => {
    const product = await Product.create(data);
    return product;
}