const { postComment, deleteComment, updateComment } = require('../controllers/comments');
const commentRouter = require('express').Router();
const { invalidPath } = require('../error-handlng')

commentRouter.post('/', postComment);

commentRouter.route('/:comment_id')
    .patch(updateComment)
    .delete(deleteComment)
    .all(invalidPath);


module.exports = commentRouter;