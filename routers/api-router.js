const express = require('express');
const apiRouter = express.Router();
const catRouter =  require('./category-router');
const reviewRouter = require('./review-router');
const endpoints = require('../endpoints.json');


apiRouter.get('/', (req, res) => {
    res.status(200).send(endpoints);
});

apiRouter.use('/categories', catRouter);

apiRouter.use('/reviews', reviewRouter);

module.exports = apiRouter;