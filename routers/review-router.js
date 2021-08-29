const reviewRouter = require('express').Router();
const { getCommentsByReviewId, postComment } = require('../controllers/comments');
const { getReviews, getReviewById, updateReview, postReview } = require('../controllers/reviews');
const { invalidPath } = require('../errors/error-handling');


reviewRouter.route('/')
    .get(getReviews)
    .post(postReview)
    .all(invalidPath);

reviewRouter.route('/:review_id')
    .get(getReviewById)
    .patch(updateReview)
    .all(invalidPath);

reviewRouter.route('/:review_id/comments')
    .get(getCommentsByReviewId)
    .post(postComment)
    .all(invalidPath);



module.exports = reviewRouter;