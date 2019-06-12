const router = require('express').Router();
const bcrypt = require('bcryptjs');

const usersDb = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    
    user.password = hash;
    // declared hash as a function to randomize pw

    usersDb.addUser(user)
        .then(saved => {
            res.status(201).json({message: 'Succesfully registered!', saved})
        }) 
        .catch(error => {
            res.status(500).json(error);
        })
})


router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    usersDb.findBy({ username })
        .first()
        .then(user => {
            if( user && bcrypt.compareSync(password, user.password)){
                res.status(200).json({ message: `${user.username}, Welcome!` })
            } else {
                res.status(401).json({ message: 'You have provided the wrong username or password'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        });
})

module.exports = router;