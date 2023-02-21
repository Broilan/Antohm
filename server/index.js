const cors = require("cors");
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const PORT = parseInt(process.env.PORT || 8080);
const routes = require('./routes');

const app = express();
const router = express.Router();


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests

// Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})

// API Routes
app.get('/', (req, res) => {
    res.json("we open for business")
  });

  router.use("/user", routes.user);


  // Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

module.exports = server;