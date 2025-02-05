const mongoose = require('mongoose');

const speedySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
        minlength: [3, "name must be at least 3 characters long!"],
        maxlength: [20, "name must be at most 20 characters long!"]

        
    },
    minutes: {
        type: Number,
        required: true,
    },
    directions: {
        type: String,
        required: true,
    },
    ingredients_one: {
        type: String,
        required: true,
    },
    ingredients_two: {
        type: String,
        required: true,
    },
    ingredients_three: {
        type: String,
        required: true,
    },
});

const Speedy = mongoose.model('Speedy', speedySchema);

module.exports = Speedy;