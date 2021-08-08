<<<<<<< HEAD
const { postComment, deleteComment, updateComment } = require('../controllers/comments');
const commentRouter = require('express').Router();

commentRouter.post('/', postComment);
commentRouter.patch('/:comment_id', updateComment);
commentRouter.delete('/:comment_id', deleteComment);


=======
const { deleteComment } = require('../controllers/comments');

const commentRouter = require('express').Router();

commentRouter.delete('/:comment_id', deleteComment);

>>>>>>> 918d02868828113a376a589938c80f32256586fa
module.exports = commentRouter;