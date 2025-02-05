const Speedy = require('../models/model.speedy');

module.exports.getAllSpeedys = (req, res) => {
    Speedy.find()
        .then(speedys => res.json(speedys))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.getSpeedyById = (req, res) => {
    Speedy.findById(req.params.id)
        .then(speedy => res.json(speedy))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.createSpeedy = (req, res) => {
    const newSpeedy = new Speedy(req.body);
    newSpeedy.save()
        .then(() => res.json('Speedy created!'))
        .catch(err => res.status(400).json('Error: ' + err));
};


module.exports.deleteSpeedy = (req, res) => {
    Speedy.findByIdAndDelete(req.params.id)
        .then(() => res.json('Speedy deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.updateSpeedy = (req, res) => {
    Speedy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(speedy => res.json(speedy))
        .catch(err => res.status(400).json('Error: ' + err));
};

