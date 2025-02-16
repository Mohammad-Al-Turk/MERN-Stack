const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user roles
const roles = ['practitioner', 'assistant', 'administrator', 'patient'];

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [100, 'First name must be less than 100 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [100, 'Last name must be less than 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    mobilePhone: {
        type: String,
        required: [true, 'Mobile phone is required'],
        minlength: [10, 'Mobile phone must be at least 10 characters long'],
        maxlength: [15, 'Mobile phone must be less than 15 characters'],
        match: [/^\d+$/, 'Please enter a valid phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: roles
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword') // UserSchema (consistent capitalization)
    .get(function() { return this._confirmPassword; })
    .set(function(value) { this._confirmPassword = value; });

UserSchema.pre('validate', function(next) { // UserSchema (consistent capitalization)
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// Hash the password before saving a user
UserSchema.pre('save', function(next) { // UserSchema (consistent capitalization)
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            next(err);
        });
});

module.exports = mongoose.model('User', UserSchema);