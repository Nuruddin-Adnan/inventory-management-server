const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(cors());

// schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the product'],
        trim: true,
        unique: [true, 'Name must be unique'],
        minLength: [3, 'Name must be at least at least 3 characters'],
        maxLength: [100, 'Name is too large']
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "quantit can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    // supplier: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: mongoose.Schema.ObjectId
    // }]


    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
}, {
    timestamps: true
});

// model
const Product = mongoose.model('Product', productSchema);


app.get('/', (req, res, next) => {
    res.send("Route is working! YaY")
});

// posting to database using save method
app.post('/api/v1/product', async (req, res, next) => {
    try {
        const product = new Product(req.body);
        if (product.quantity === 0) {
            product.status = 'out-of-stock'
        }
        const result = await product.save();
        res.status(200).json({
            status: 'success',
            message: 'Successfully inserted product',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: `${error.message}`
        })
    }
})

// // posting to database using create method
// app.post('/api/v1/product', async (req, res, next) => {
//     try {
//         const result = await Product.create(req.body);
//         res.status(200).json({
//             status: 'success',
//             message: 'Successfully inserted product',
//             data: result
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: 'Data is not inserted',
//             error: `${error.message}`
//         })
//     }
// })


module.exports = app;