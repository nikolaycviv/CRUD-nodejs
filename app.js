'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Imports routes for the users
const user = require('./routes/user'); // Imports routes for the users
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Body Parser is used to parse the incoming request bodies in a middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', user);

// server runnning
const port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
