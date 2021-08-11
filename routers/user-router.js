const userRouter = require('express').Router();
const { getAllUsers, getUser } = require('../controllers/users');
const { invalidPath } = require('../error-handlng');


userRouter.get('/', getAllUsers);
userRouter.get('/:username', getUser);
userRouter.all('/', invalidPath);

module.exports = userRouter;