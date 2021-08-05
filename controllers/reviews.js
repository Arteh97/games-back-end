const { selectReviewById, patchReview, selectReviews } = require('../models/reviews');
const { addComment } = require('../models/comments');


exports.getReviews = (req, res, next) => {
    selectReviews(req.query).then((reviews) => {
        res.status(200).send({ reviews });
    })
    .catch(next);
}

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params;
    selectReviewById(review_id).then((review) => {
        res.status(200).send(review[0]);
    })
    .catch(next);
}

exports.updateReview = async (req, res, next) => {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    patchReview(review_id, inc_votes).then((review) => {
        res.status(201).send(review[0]);
    })
    .catch(next)
} 



