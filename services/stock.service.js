const Brand = require("../models/Brand");
const Stock = require("../models/Stock")

exports.getStocksService = async (filters, queries) => {
    const stocks = await Stock
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sort);

    const total = await Stock.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)

    return { total, page, stocks };
}

exports.getStockByIdService = async (id) => {
    const stock = await Stock.findOne({ _id: id }).populate('brand.id').populate('store.id').populate('suppliedBy.id');
    return stock;
}

exports.createStockService = async (data) => {
    const stock = await Stock.create(data);
    return stock;
}

exports.updateStockService = async (stockId, data) => {
    const result = await Stock.updateOne({ _id: stockId }, { $set: data }, {
        runValidators: true
    })
    return result
}

exports.bulkUpdateStockService = async (data) => {
    const stocks = [];

    data.forEach(stock => {
        stocks.push(Stock.updateOne({ _id: stock.id }, stock.data), {
            runValidators: true
        })
    });

    const result = await Promise.all(stocks)
    return result;
}

exports.deleteStockService = async (id) => {
    const result = await Stock.deleteOne({ _id: id })
    return result
}

exports.bulkDeleteStockService = async (ids) => {
    const result = await Stock.deleteMany({ _id: ids })
    return result
}