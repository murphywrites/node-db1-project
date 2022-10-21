const express = require("express");
const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter)

server.use((err, req, res, next) => {
    const { message, stack, status = 500 } = err
    const response = { message }
    if (process.env.NODE_ENV !== 'production' && stack) {
        response.stack = stack
    }
    res.status(status).json(response)
})

module.exports = server;
