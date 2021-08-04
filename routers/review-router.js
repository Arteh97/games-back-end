const reviewRouter = require('express').Router();
const { getCommentsByReviewId } = require('../controllers/comments');
const { getReviews, getReviewById, updateReview } = require('../controllers/reviews');


reviewRouter.get('/', getReviews);

reviewRouter.get('/:review_id', getReviewById);

reviewRouter.patch('/:review_id', updateReview)

reviewRouter.get('/:review_id/comments', getCommentsByReviewId);


module.exports = reviewRouter;