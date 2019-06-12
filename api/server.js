const express = require('express');
const helmet= require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js')

const server = express()

const sessionConfig = {
    name: 'development', // default is sid, dangerous to make it defaul
    secret: 'Whatever you want it to be',
    resave: false, // if there are no changes to the session, don't save
    saveUninitialized: true, //GDPR
    cookie : {
        maxAge: 1000 * 60 * 10, // 1 sec * 60 * 10 = 10 minutes
        secure: false, // send cookie only over https, set to true in prod
        htttpOnly: true, // always set to true, IMP! client JS  cant access the cookie
    },

}

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.send('<h1>API running</h1>')
});

server.use('/api/', authRouter);
server.use('/api/users', usersRouter);


module.exports = server;