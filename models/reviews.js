const db = require('../db/connection');
const { checkSort, checkOrder } = require('../utils/data-manipulation');



exports.selectReviewById = async (review_id) => {
    const queryStr = `SELECT reviews.*, COUNT(comments.review_id) 
    AS comment_count 
    FROM reviews LEFT JOIN comments 
    ON reviews.review_id = comments.review_id 
    WHERE reviews.review_id = $1 GROUP BY reviews.review_id LIMIT 1;`;

    const review = await db.query(queryStr, [review_id]).then((review) => {
      return review.rows;
    })

  if (!review.length) {
    return Promise.reject({ status: 404, msg: "Review not found",});
  }
  return review;
};

exports.patchReview = async (review_id, inc_votes) => {
    const updated = await db.query(`UPDATE reviews SET votes = votes + $1 
    WHERE review_id = $2 RETURNING *;`, [inc_votes, review_id])
    .then((result) => result.rows);

    if(!updated.length) return Promise.reject({ status: 404, msg: "Review not found"});

    return updated;
}

exports.selectReviews = async ({ sort_by = 'created_at', order = 'desc', owner, category }) => {
const validColumns = [
  'owner',
  'title',
  'review_id',
  'review_img_url',
  'created_at',
  'votes',
  'comment_count',
];

const validSort = await checkSort(sort_by, validColumns);

const validOrder = await checkOrder(order);

let queryStr = `SELECT reviews.*,
COUNT(comments.comment_id) AS comment_count FROM reviews
LEFT JOIN comments ON comments.review_id = reviews.review_id `

let queryVals = [];

if (category) {
  queryVals.push(category);
  queryStr += `WHERE reviews.category ILIKE $${queryVals.length}`;
}

if (owner) {
  queryVals.push(owner);
  queryStr += `${category ? 'AND ' : ''}WHERE reviews.owner ILIKE $${
    queryVals.length}`;
}

queryStr += `GROUP BY reviews.review_id ORDER BY ${validSort} ${validOrder};`;

const reviews = await db.query(queryStr, queryVals)
.then((results) => results.rows);

// console.log(reviews); check if review exists (checkExists export)

return reviews;

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