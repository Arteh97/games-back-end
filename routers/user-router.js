const userRouter = require('express').Router();
const { getAllUsers, getUser } = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:username', getUser);

module.exports = userRouter;