const { fetchAllUsers, fetchUser } = require('../models/users');

exports.getAllUsers = (req, res, next) => {
    console.log(req.url)
    fetchAllUsers().then((users) => {
        res.status(200).send({ users });
    }).catch(next);
};

exports.getUser = (req, res, next) => {
    const { username } = req.params;
    fetchUser(username).then((user) => {
        res.status(200).send({ user });
    }).catch(next);
}