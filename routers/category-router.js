const categoryRouter = require('express').Router();
const { getCategories } = require('../controllers/categories');


categoryRouter.get('/', getCategories);


module.exports = categoryRouter;
