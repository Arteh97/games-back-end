    const { selectCategories } = require('../models/categories');


exports.getCategories =  async (req, res) => {
     selectCategories().then((categories) => {
        res.status(200).send(categories);
    })
}