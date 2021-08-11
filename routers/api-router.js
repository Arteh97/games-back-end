const express = require('express');
const apiRouter = express.Router();
const categoryRouter =  require('./category-router');
const reviewRouter = require('./review-router');
const commentRouter = require('./comment-router');
const userRouter = require('./user-router');
const endpoints = require('../endpoints.json');
const { invalidPath } = require('../error-handlng');


apiRouter.get('/', (req, res) => {
    res.status(200).send(endpoints);
});
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/users', userRouter);
apiRouter.route('/').all(invalidPath);
module.exports = apiRouter;