const db = require('../db/connection');

exports.selectReviews = () => {
    return db.query('SELECT * FROM reviews;').then((results) => {
        return results.rows;
    })
}

exports.selectReviewById = async (review_id) => {
    const queryStr = `SELECT reviews.*, COUNT(comments.review_id) 
    AS comment_count 
    FROM reviews LEFT JOIN comments 
    ON reviews.review_id = comments.review_id 
    WHERE reviews.review_id = $1 GROUP BY reviews.review_id LIMIT 1;`;

    const review = await db.query(queryStr, [review_id])
    .then((result) => result.rows);

  if (!review.length) {
    return Promise.reject({
      status: 404,
      msg: "Review Not Found",
    });
  }
  return review[0];
};

exports.patchReview = async (review_id, inc_votes) => {
    return db.query(`UPDATE reviews SET votes = votes + $1 
    WHERE review_id = $2 RETURNING *;`, [inc_votes, review_id])
    .then((updatedReview) => {
        return updatedReview.rows[0];
    });
};









    // // const review = db.query('SELECT * FROM reviews where review_id = $1;', [review_id]).then((result) => {
    //     // return result.rows;
    //     return db.query('SELECT reviews.* , COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id;').then((result) => {.then((result) => {[
    //             console.log(results.rows)

    //     })

        // ]})
        // }).then((result) => {
        
    // })
    

// 'SELECT review_id FROM comments LEFT JOIN reviews on reviews.review_id = comments.review_id GROUP BY reviews.review_id'