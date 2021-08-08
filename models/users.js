const db = require('../db/connection')

exports.fetchAllUsers = async () => {
    return db.query(`SELECT DISTINCT(username) FROM users;`).then((users) => {
        return users.rows;
    })
}

exports.fetchUser = async (username) => {
    const query = await db.query(`SELECT * FROM users WHERE username = $1;`, [username]).then((user) => {
        return user.rows;
    });
    if (!query.length) return Promise.reject({ status: 404, msg: "User not found"});

    return query;
}