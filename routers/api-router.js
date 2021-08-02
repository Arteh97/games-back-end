const apiRouter = require('express').Router();
const catRouter =  require('./category-router');
const reviewRouter = require('./review-router')


apiRouter.get('/', (req, res) => {
    res.status(200).send({ "msg": 'All OK from /api !' });
});

apiRouter.use('/categories', catRouter);

apiRouter.use('/reviews', reviewRouter);

module.exports = apiRouter;