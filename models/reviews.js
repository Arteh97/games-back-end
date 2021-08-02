const db = require('../db/connection');
const comments = require('../db/data/test-data/comments');
const reviews = require('../db/data/test-data/reviews');

exports.selectReviews = () => {
    return db.query('SELECT * FROM reviews;').then((results) => {
        return results.rows
    })
}

exports.selectReviewById = (review_id) => {
    return db.query('SELECT comments.review_id FROM comments LEFT JOIN reviews on reviews.review_id = comments.review_id GROUP BY comments.review_id').then(() => {
        return  db.query('SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id;', [review_id]).then((results) => {
          console.log(results.rows);
        })
      });

    // // const review = db.query('SELECT * FROM reviews where review_id = $1;', [review_id]).then((result) => {
    //     // return result.rows;
    //     return db.query('SELECT reviews.* , COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id;').then((result) => {.then((result) => {[
    //             console.log(results.rows)

    //     })

        // ]})
        // }).then((result) => {
        
    // })
    
};

// 'SELECT review_id FROM comments LEFT JOIN reviews on reviews.review_id = comments.review_id GROUP BY reviews.review_id'