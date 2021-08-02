const db = require('../db/connection');
const comments = require('../db/data/test-data/comments');
const reviews = require('../db/data/test-data/reviews');

exports.selectReviews = () => {
    return db.query('SELECT * FROM reviews;').then((results) => {
        return results.rows
    })
}

exports.selectReviewById = (review_id) => {
    // const review = db.query('SELECT * FROM reviews where review_id = $1;', [review_id]).then((result) => {
        // return result.rows;
        return db.query('SELECT review_id FROM comments LEFT JOIN reviews on reviews.review_id = comments.review_id;').then((result) => {[
        console.log(results.rows)

        ]})
        // }).then((result) => {
        
    // })
    
};

// 'SELECT review_id FROM comments LEFT JOIN reviews on reviews.review_id = comments.review_id GROUP BY reviews.review_id'