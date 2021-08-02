const catRouter = require('express').Router();
const { getCategories } = require('../controllers/categories');


catRouter.get('/', getCategories);


module.exports = catRouter;
