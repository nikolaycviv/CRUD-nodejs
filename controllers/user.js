const UserModel = require('../models/user');

exports.welcome = (req, res) => {
    res.json({ message: 'Greetings from our great Holiday API!' });
};

exports.userCreate = (req, res) => {
    let user = new UserModel(req.body);

    user.save((err) => {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'New user created successfully!', user: user });
    });
};
exports.allUsersDetails = (req, res) => {
    UserModel.find({}, (err, users) => {
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.userDetails = (req, res) => {
    UserModel.findById(req.params.id, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.userUpdate = (req, res) => {
    UserModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'The user is udpated.', user: user });
    });
};

exports.userDelete = (req, res) => {
    UserModel.deleteOne({ _id: req.params.id }, (err) => {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'The user is deleted successfully!' });
    });
};
