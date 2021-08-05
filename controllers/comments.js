const { addComment, selectComments } = require('../models/comments');
const { selectReviewById } = require('../models/reviews');

exports.getCommentsByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    const { sort_by, order } = req.query;

    selectComments(review_id, sort_by, order).then((comments) => {
        res.status(200).send({ comments });
    }).catch(next);
};

exports.postComment = (req, res, next) => {
    const { review_id } = req.params;
    const { body } = req;
    addComment(review_id, body).then((comment) => {
        res.status(201).send({ comment });
    }).catch(next);
}