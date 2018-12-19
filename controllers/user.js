"use strict";

const User = require("../models/user");

exports.welcome = (req, res) => {
    res.json({ message: "Greetings from our great Holiday API!" });
}

exports.user_create = (req, res) => {
    let user = new User(req.body);

    user.save((err, user) => {
        if (err) res.send(err);
        res.json({ message: "New user created successfully!", user});
    })
}
exports.all_users_details = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.send(err);
        res.json(users);
    })
};

exports.user_details = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send(err);
        res.json(user);
    })
};

exports.user_update = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, {new: true}, (err, user) => {
        if (err) res.send(err);
        res.json({ message: "The user is udpated.", user});
    });
};

exports.user_delete = (req, res) => {
    User.deleteOne({_id: req.params.id}, (err, user) => {
        if (err) res.send(err);
        res.json({ message: "The user is deleted successfully!" });
    });
};
