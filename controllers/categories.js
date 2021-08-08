const { selectCategories, addCategory } = require('../models/categories');


exports.getCategories =  async (req, res, next) => {
     selectCategories().then((categories) => {
        res.status(200).send({ categories });
    }).catch(next)
}

exports.postCategory = async (req, res, next) => {
    const { slug, description } = req.body;
    addCategory(slug, description).then(([category]) => {
        res.status(201).send({ category });
    }).catch(next);
}