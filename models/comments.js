const db = require('../db/connection');
const { checkSort, checkOrder } = require('../utils/data-manipulation');

exports.addComment = (review_id, { body, username }) => {
    
    if (body === '') return Promise.reject({ status: 400, msg: 'Comment section is empty' })

        return db.query(`INSERT INTO comments (review_id, author, body) 
        VALUES ($1, $2, $3) RETURNING *;`,
          [review_id, username, body]
        ).then((result) => {
            return result.rows;
        });
    };

exports.selectComments = async ( review_id, sort_by = 'created_at', order = 'desc' ) => {
    const validColumns = [
        'comment_id',
        'votes',
        'created_at',
        'author',
        'body'
    ]

const validSort = await checkSort(sort_by, validColumns);
const validOrder = await checkOrder(order);

    if(!validSort) {
        return Promise.reject({ status: 400, msg: "Invalid sort query"})
    };

    if(!validOrder) {
        return Promise.reject({ status: 400, msg: "Invalid order query"})
    };

    const queryStr = `SELECT * FROM comments where review_id = $1 ORDER BY ${sort_by} ${order}`;

    const comments = await db.query(queryStr, [review_id]).then((result) => {
        return result.rows;
    });

    if (!comments.length) return Promise.reject({ status: 400, msg: "No comments found"});

    return comments;

};

