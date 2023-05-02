const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

// schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the product'],
        trim: true,
        unique: true,
        minLength: [3, 'Name must be at least at least 3 characters'],
        maxLength: [100, 'Name is too large']
    },
    description: {
        type: String,
        required: true
    },
    imageURLs: {
        type: [String],
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid = false;
                    }
                })
                return isValid;
            },
            message: "Please provide valid img urls"
        }
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    }
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

// create custom method  for testing
productSchema.methods.logger = function () {
    console.log(`Data save for ${this.name}`);
}

// model
const Product = mongoose.model('Product', productSchema);

module.exports = Product