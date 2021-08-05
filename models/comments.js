const db = require('../db/connection');
const { checkSort, checkOrder } = require('../utils/data-manipulation');

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

    return comments;

};

// exports.addComment = async (review_id, username, body) => { 
//     // insert a comment into the comment table...
//     // with the correct review_id
//     // comment table accepts author and body, so username needs changing
//     // must be within an array in dbquery



// }
