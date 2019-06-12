const express = require('express');
const usersDb = require('./users-model.js')
const restrictedmdw = require('../auth/restrictedmdw');

const router= express.Router();


router.get('/', restrictedmdw,  ( req,res) => {
    usersDb.listUsers()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports= router;