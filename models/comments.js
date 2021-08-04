const db = require('../db/connection');

exports.selectComments = async ( review_id, sort_by = 'created_at', order = 'desc' ) => {

    const validColumns = [
        'comment_id',
        'votes',
        'created_at',
        'author',
        'body'
    ]

    const validSort = validColumns.includes(sort_by);
    const validOrder = order.toLowerCase() === 'asc' || 'desc';

    if(!validSort) {
        return Promise.reject({ status: 400, msg: "Invalid sort query"})
    };

    if(!validOrder) {
        return Promise.reject({ status: 400, msg: "Invalid order query"})
    };

    const queryStr = `SELECT * FROM comments where review_id = $1 ORDER BY ${sort_by} ${order}`;

    const comments = await db.query(queryStr, [review_id]).then((found) => {
        return found.rows;
    });

    return comments;

};
