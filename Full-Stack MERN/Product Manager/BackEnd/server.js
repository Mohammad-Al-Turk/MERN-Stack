require('dotenv').config();
require('./config/mongoose.config'); 

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

app.use(express.json());  
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));


require('./routes/route.product')(app);

app.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});



