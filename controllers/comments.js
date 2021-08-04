const { selectComments } = require('../models/comments');
const { selectReviewById } = require('../models/reviews');

exports.getCommentsByReviewId = async (req, res, next) => {
    const { review_id } = req.params;
    const { sort_by, order } = req.query;

    const findReview = selectReviewById(review_id);
    const findComments = selectComments(review_id, sort_by, order)

    Promise.all([findReview, findComments])
    .then(([comments]) => {
        res.status(200).send({ comments });
    })
};

exports.postComment = async () => {
    
}

