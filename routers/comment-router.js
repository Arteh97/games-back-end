const { postComment, deleteComment, updateComment } = require('../controllers/comments');
const commentRouter = require('express').Router();

commentRouter.post('/', postComment);
commentRouter.patch('/:comment_id', updateComment);
commentRouter.delete('/:comment_id', deleteComment);


module.exports = commentRouter;