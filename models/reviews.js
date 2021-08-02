const db = require('../db/connection');

exports.selectReviews = () => {
    return db.query('SELECT * FROM reviews;').then((results) => {
        return results.rows
    })
}

exports.selectReviewById = (review_id) => {
    return db.query('SELECT * FROM reviews where review_id = $1;', [review_id]).then((result)=>{
        return result.rows;
    })
}