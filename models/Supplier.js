const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a name"],
        minLength: [3, "Name must be at least  3 characters"],
        maxLength: [100, "Name is too large"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        unique: true
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
    },
    contactNumber: {
        type: String,
        required: [true, "Please provide a emaergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a contact number"
        }
    },
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide a emaergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a emergency contact number"
        }
    },
    tradeLicenceNumber: {
        type: String,
        required: [true, "Please provide a trade licence number"],
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide present address"],
    },
    permanentAddress: {
        type: String,
        required: [true, "Please provide permanent address"],
    },
    store: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensing"],
            message: "{VALUE} is not a valid name"
        }
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    nationalIdimageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    }
}, {
    timestamps: true
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;