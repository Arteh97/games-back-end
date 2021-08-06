const express = require('express');
const apiRouter = express.Router();
const categoryRouter =  require('./category-router');
const reviewRouter = require('./review-router');
const commentRouter = require('./comment-router');
const endpoints = require('../endpoints.json');


apiRouter.get('/', (req, res) => {
    res.status(200).send(endpoints);
});
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/categories', categoryRouter);

module.exports = apiRouter;