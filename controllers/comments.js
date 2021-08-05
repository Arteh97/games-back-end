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
    console.log('in the controller');
    const { review_id } = req.params;
    const { username, body } = req.body;
    addComment(review_id, username, body).then((comment) => {
        res.status(201).send({ comment });
    }).catch(next);
}