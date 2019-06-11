const bcrypt = require('bcryptjs');

const usersDb = require('../users/users-model');

module.exports = function restrictedmdw( req, res, next) {
    const { username, password } = req.headers;

    if (username && password) {
        usersDb.findBy( { username })
        .first()
        .then( user => {
            if ( user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json( { message: 'Wrong credentials, unauthorized'});
            }
        })
        .catch(error => {
            res.status(500).json(error)
        });
    } else {
        res.status(400).json({ message: 'Unauthorized, please log-in or register'});
    }
};