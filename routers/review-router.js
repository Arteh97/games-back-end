const reviewRouter = require('express').Router();
const { getCommentsByReviewId, postComment } = require('../controllers/comments');
const { getReviews, getReviewById, updateReview } = require('../controllers/reviews');


reviewRouter.get('/', getReviews);

reviewRouter.get('/:review_id', getReviewById);

reviewRouter.patch('/:review_id', updateReview)

reviewRouter.get('/:review_id/comments', getCommentsByReviewId);

reviewRouter.post('/:review_id/comments', postComment);


module.exports = reviewRouter;