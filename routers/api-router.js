const express = require('express');
const apiRouter = express.Router();
const categoryRouter =  require('./category-router');
const reviewRouter = require('./review-router');
const commentRouter = require('./comment-router');
<<<<<<< HEAD
const userRouter = require('./user-router');
=======
>>>>>>> 918d02868828113a376a589938c80f32256586fa
const endpoints = require('../endpoints.json');


apiRouter.get('/', (req, res) => {
    res.status(200).send(endpoints);
});
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/categories', categoryRouter);
<<<<<<< HEAD
apiRouter.use('/users', userRouter);


=======
>>>>>>> 918d02868828113a376a589938c80f32256586fa

module.exports = apiRouter;