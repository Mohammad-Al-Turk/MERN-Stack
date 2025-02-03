const mongoose = require ('mongoose')

const JokeSchema = new mongoose.Schema({
    setup:{
      type : String
    },
    punchline:{
      type : String
    }
})   //document


const Joke = mongoose.model('Joke',JokeSchema);
module.exports = Joke;

// or
// module.exports= mongoose.model('Joke',JokeSchema);