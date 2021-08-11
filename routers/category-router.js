const categoryRouter = require('express').Router();
const { getCategories, postCategory } = require('../controllers/categories');
const { invalidPath } = require('../error-handlng')

categoryRouter.route('/')
    .get(getCategories)
    .post(postCategory)
    .all(invalidPath);

module.exports = categoryRouter;
