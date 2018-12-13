'use strict';

var User = require('../models/user');

//Simple version, without validation or sanitation
exports.welcome = function (req, res) {
    res.send('Greetings from our great Holiday API!');
};

exports.user_create = function (req, res) {
    var user = new User(
        {
            email: req.body.email,
            givenName: req.body.givenName,
            familyName: req.body.familyName
        }
    );

    user.save(function (err) {
        if(err) res.send(err);
        res.send('User with e-mail ' + user.email + ' created successfully!')
    })
};

exports.all_users_details = function (req, res) {
    User.find({}, function (err, users) {
        if(err) res.send(err);
        res.send(users);
    })
};

exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if(err) res.send(err);
        res.send(user);
    })
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        if(err) res.send(err);
        res.send('User with e-mail ' + user.email + ' udpated.');
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if(err) res.send(err);
        res.send('User with e-mail ' + user.email + 'deleted successfully!');
    })
};
