require('dotenv').config();
const mongoose = require('mongoose');

// Ensure environment variables are loaded
const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const password = process.env.ATLAS_PASSWORD;

if (!dbName || !username || !password) {
    console.error("Missing database credentials in .env file");
    process.exit(1);
}

// Encode password in case it contains special characters
const encodedPassword = encodeURIComponent(password);

const uri = `mongodb+srv://${username}:${encodedPassword}@cluster0.i8s4o.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
    .then(() => console.log("Successfully connected to the database"))
    .catch(err => {
        console.error("Database connection error:", err.message);
        process.exit(1);
    });