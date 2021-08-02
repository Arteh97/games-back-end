const reviewRouter = require('express').Router();
const { getReviews, getReviewById } = require('../controllers/reviews');

reviewRouter.get('/', getReviews);

reviewRouter.get('/:id', getReviewById);


module.exports = reviewRouter;