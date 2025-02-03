const Joke = require('../models/joke.models');

  module.exports = {
    findAllJoke: (req, res) => {
        Joke.find()
            .then((allJokes) => res.json({ jokes: allJokes }))
            .catch((err) => res.status(400).json({ message: 'Error finding jokes', error: err }));
    },
    createJoke: (req, res) => {
        Joke.create(req.body)
            .then((newJoke) => res.json({ joke: newJoke }))
            .catch((err) => res.status(400).json({ message: 'Error creating joke', error: err }));
    },
    
    deleteJoke: (req, res) => {
      Joke.deleteOne({_id: req.params.id})
      .then(result => res.json(result))
      .catch(error => res.status(404).json(error));
  },
    
    updateJoke: (req, res) => {
      Joke.findOneAndUpdate({_id: req.params.id},req.body )
      .then(result => res.json(result))
      .catch(error => res.status(404).json(error));
  }

};