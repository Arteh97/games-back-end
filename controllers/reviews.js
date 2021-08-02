const { selectReviews, selectReviewById } = require('../models/reviews');

exports.getReviews = (req, res) => {
    selectReviews().then((reviews) => {
        res.status(200).send(reviews);
    })
}

exports.getReviewById = (req, res) => {
    const { id } = req.params;
    selectReviewById(id).then((review) => {
        res.status(200).send(review);
    })
}