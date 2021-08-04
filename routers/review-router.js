const reviewRouter = require('express').Router();
const { getReviews, getReviewById, updateReview } = require('../controllers/reviews');

reviewRouter.get('/', getReviews);

reviewRouter.get('/:review_id', getReviewById);

reviewRouter.patch('/:id', updateReview)


module.exports = reviewRouter;