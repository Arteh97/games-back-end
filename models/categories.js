const db = require('../db/connection');

exports.selectCategories = () => {
    return db.query('SELECT * FROM categories;')
    .then((results) => {
        return results.rows;
    });
}

exports.addCategory = async (slug, description) => {
    if (!slug || slug === "") {
        return Promise.reject({ status: 400, msg: "slug field incomplete" });
    } else if (!description || description === "") {
        return Promise.reject({ status: 400, msg: "description field incomplete"});
    }
    const posted = await db.query(`INSERT INTO categories (slug, description)
    VALUES ($1, $2) RETURNING *;`, [slug, description]).then((category) => {
        return category.rows
    }); 
    return posted;
}
