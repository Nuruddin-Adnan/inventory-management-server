const mongoose = require("mongoose");

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

// middleware
productSchema.pre('save', function (next) {
    console.log('Before saving data');
    if (this.quantity === 0) {
        this.status = 'out-of-stock'
    }
    next()
})

// productSchema.post('save', function (next) {
//     console.log('After saving data');
// })

// create custom method
productSchema.methods.logger = function () {
    console.log(`Data save for ${this.name}`);
}

// model
const Product = mongoose.model('Product', productSchema);

module.exports = Product