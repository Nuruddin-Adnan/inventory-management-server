const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name"],
        maxLength: [100, "Name shouldn't be more than  100 character"],
        unique: true,
        lowercase: true
    },
    description: String,
    email: {
        typd: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    location: String,
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;