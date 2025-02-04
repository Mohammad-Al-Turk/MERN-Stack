const { Product } = require('../models/model.product');

module.exports.CreateProduct = (request, response) => {
    const { title, price,description } = request.body;
    Product.create({
        title,
        price,
        description
    })
            .then(Product => response.json(Product))
            .catch(err => response.json(err));
    }

module.exports.getAllProducts = (request, response) => {
    Product.find({})
        .then(allProducts => response.json(allProducts))
        .catch(err => response.json(err))
}

module.exports.getProduct = (request, response) => {
    Product.findOne({_id:request.params.id})
        .then(Product => response.json(Product))
        .catch(err => response.json(err))
}

module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate({_id:request.params.id}, request.body, {new:true})
        .then(updatedProduct => response.json(updatedProduct))
        .catch(err => response.json(err))
}

//delet
module.exports.deleteProduct = (request, response) => {
    Product.deleteOne({_id:request.params.id})
        .then(result => response.json(result))
        .catch(err => response.json(err))
}


    