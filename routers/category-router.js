const categoryRouter = require('express').Router();
const { getCategories, postCategory } = require('../controllers/categories');
const { invalidPath } = require('../errors/error-handling')

categoryRouter.route('/')
    .get(getCategories)
    .post(postCategory)
    .all(invalidPath);

module.exports = categoryRouter;
