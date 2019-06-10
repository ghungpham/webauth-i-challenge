const express = require('express');
const helmet= require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js')


const server = express()

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('<h1>API running</h1>')
});

server.use('/api/', authRouter);


module.exports = server;