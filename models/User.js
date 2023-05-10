const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide a valid email'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        maxLength: 50,
        validate: {
            validator: (value) => {
                return validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0
                })
            },
            message: "Password {VALUE} is not strong enough"
        }
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide a confirm password'],
        validate: {
            validator: function (value) {
                return value === this.password
            }
        },
        message: "Confirm Password doesn't match"
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer"
    },
    firstName: {
        type: String,
        required: [true, 'Please provide first name'],
        trim: true,
        minLength: [3, "Name must be at leaset 3 characters"],
        maxLength: [100, "Name is too large"],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide first name'],
        trim: true,
        minLength: [3, "Name must be at leaset 3 characters"],
        maxLength: [100, "Name is too large"],
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid phone number"]
    },
    shippingDetails: String,
    district: String,
    divison: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    status: {
        type: String,
        enum: ["active", "in-active", "blocked"],
        default: "in-active"
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password, 10)
    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;