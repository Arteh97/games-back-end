const { deleteComment } = require('../controllers/comments');

const commentRouter = require('express').Router();

commentRouter.delete('/:comment_id', deleteComment);

module.exports = commentRouter;