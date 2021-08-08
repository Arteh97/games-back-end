const categoryRouter = require('express').Router();
const { getCategories, postCategory } = require('../controllers/categories');


categoryRouter.get('/', getCategories);
categoryRouter.post('/', postCategory);


module.exports = categoryRouter;
