require('dotenv').config();
require('./config/mongoose.config')
PORT = 8000

const express = require('express');
const app = express();
const cors = require('cors');



//Middleware
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json("success");
})
//Routes

const jokeRoutes = require('./routes/joke.routes')
jokeRoutes(app);


app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
}); 