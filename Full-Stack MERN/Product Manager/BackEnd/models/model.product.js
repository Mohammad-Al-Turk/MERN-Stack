const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title : { type: String,
            required: [true, "Title is required!"],
            minlength: [3, "Title must be at least 3 characters long!"],
            maxlength: [255, "Title must be at most 255 characters long!"]
    },
    price : { type: Number,
            required: [true, "Price is required!"],
            min: [0, "Price must be at least 0!"],
            max: [1000000, "Price must be at most 1,000,000!"],
        
    },
    description : { type: String,
            required: [true, "Description is required!"],
            minlength: [3, "Description must be at least 3 characters long!"],
            maxlength: [255, "Description must be at most 255 characters long!"]
     }

}, { timestamps: true });
Product = mongoose.model('Product', ProductSchema);
module.exports.Product = Product;