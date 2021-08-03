const express = require('express');
const apiRouter = require('./routers/api-router');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    // handle custom errors
    if (err.status) {
        res.status(err.status).send({ msg: err.msgv});
        // handle psql errors
    } else if (err.code === '23502' || err.code === '22001') {
        res.status(400).send({ msg: 'bad request' });
    } else {
        //handle internal errors
        res.status(500).send({ msg: 'Server ERROR!'})
    }

});

module.exports = app;