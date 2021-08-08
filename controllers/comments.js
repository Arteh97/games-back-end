const { addComment, selectComments, removeComment, patchComment } = require('../models/comments');

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

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    removeComment(comment_id).then(() => {
        res.status(204).send({});
    }).catch(next);
}

exports.updateComment = (req, res, next) => {
    const { inc_votes } = req.body;
    const { comment_id } = req.params;
    patchComment(comment_id, inc_votes).then((comment) => {
        res.status(201).send({ comment });
    }).catch(next)
}
