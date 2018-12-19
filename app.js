

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

// Imports and sets routes for the users
const user = require('./routes/user');

// Body Parser is used to parse the incoming request bodies in a middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.status(err.status).json(err);
    next(err);
});

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
mongoose.connect(mongoDB, {
    useCreateIndex: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// server runnning
if(!module.parent) {
    app.listen(port, () => {
        console.log(`Server is up and running on port number ${port}`);
    });
}

module.exports = app;
