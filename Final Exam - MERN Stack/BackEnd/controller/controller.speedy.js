const { model } = require('mongoose');
const { Speedy } = require('../models/model.speedy');

module.exports.CreateSpeedy = (request, response) => {
    const { name, minutes, directions, ingredients_one, ingredients_two, ingredients_three } = request.body;
    Speedy.create({
        name,
        minutes,
        directions,
        ingredients_one,
        ingredients_two,
        ingredients_three
    })
      .then(Speedy => response.json(Speedy))
    .catch(err => response.status(400).json(err))  
}

module.exports.getAllSpeedy = (request, response) => {
    Speedy.find({})
        .then(Speedy => response.json(Speedy))
        .catch(err => response.json(err))
}

module.exports.getSpeedy = (request, response) => {
    Speedy.findOne({_id:request.params.id})
        .then(Speedy => response.json(Speedy))
        .catch(err => response.json(err))
}

module.exports.updateSpeedy = (request, response) => {
    Speedy.findOneAndUpdate({_id:request.params.id}, request.body, {new:true})
        .then(updatedSpeedy => response.json(updatedSpeedy))
        .catch(err => response.json(err))
}

module.exports.deleteSpeedy = (request, response) => {
    Speedy.deleteOne({_id:request.params.id})
        .then(result => response.json(result))
        .catch(err => response.json(err))
}



