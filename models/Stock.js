const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

// schema
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for the product'],
        trim: true,
        minLength: [3, 'Name must be at least at least 3 characters'],
        maxLength: [100, 'Name is too large']
    },
    description: {
        type: String,
        required: true
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid image URL"]
    }],
    unit: {
        type: String,
        required: [true, 'Please provide the unit value'],
        enum: {
            values: ["gm", "kg", "ml", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be gm/kg/ml/litre/pcs/bag"
        }
    },
    price: {
        type: Number,
        required: [true, 'Please provide a valid value'],
        min: [0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide the quantity'],
        min: [0, "Product quantity can't be negative"]
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    },
    category: {
        type: String,
        required: [true, 'Please provide a category name'],
    },
    brnad: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a store name"],
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensing"],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            ref: 'Store',
            required: true
        }
    },
    suppliedBy: {
        name: {
            type: String,
            required: [true, "Please provide a supplier name"],
            trim: true,
        },
        id: {
            type: ObjectId,
            ref: 'Supplier'
        }
    },
    sellCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

stockSchema.pre('save', function (next) {
    if (this.quantity = 0) {
        this.status = 'out-of-stock'
    }
    next()
})

// model
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock