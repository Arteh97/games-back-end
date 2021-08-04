const { selectReviews, selectReviewById, patchReview } = require('../models/reviews');

exports.getReviews = (req, res, next) => {
    selectReviews().then((reviews) => {
        res.status(200).send(reviews);
    }).catch(next);
}

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params;
    selectReviewById(review_id).then((review) => {
        res.status(200).send(review);
    }).catch(next);
}

exports.updateReview = async (req, res, next) => {
    const { id } = req.params;
    const { inc_votes } = req.body;
    await patchReview(id, inc_votes).then((review) => {
        res.status(201).send({ review })
    }).catch(next)
} 

// exports.postReview = (req, res, next) => {
// 
// }
// { inc_votes : 1 }