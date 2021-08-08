const { addReview, selectReviewById, patchReview, selectReviews } = require('../models/reviews');


exports.getReviews = (req, res, next) => {
    selectReviews(req.query).then((reviews) => {
        res.status(200).send({ reviews });
    })
    .catch(next);
}

exports.getReviewById = (req, res, next) => {
    const { review_id } = req.params;
    selectReviewById(review_id).then((review) => {
        res.status(200).send({ review });
    })
    .catch(next);
}

exports.updateReview = async (req, res, next) => {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    patchReview(review_id, inc_votes).then((review) => {
        res.status(201).send({ review });
    })
    .catch(next)
} 

exports.postReview = async (req, res, next) => {
    const copy = [req.body];
   const formatted = await copy.map(({ owner, title, review_body, designer, category }) => [owner, title, review_body, designer, category]);
   addReview(formatted).then((review) => {
       res.status(201).send({ review });
       console.log(review)
   })
    // res.status(500).send("not working yet")
}



