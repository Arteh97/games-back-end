const format = require('pg-format');
const db = require('../../db/connection.js');
const { formatData } = require('../../utils/data-manipulation');


const dropTables = async () => {
    await db.query('DROP TABLE IF EXISTS comments');
    await db.query('DROP TABLE IF EXISTS reviews');
    await db.query('DROP TABLE IF EXISTS categories');
    await db.query('DROP TABLE IF EXISTS users');
}

const createTables = async () => {

    await db.query(`CREATE TABLE categories
    (slug VARCHAR(200) NOT NULL PRIMARY KEY,
    description TEXT NOT NULL);`)

    await db.query(`CREATE TABLE users
    (username VARCHAR(200) NOT NULL PRIMARY KEY,
    avatar_url TEXT NOT NULL,
    name VARCHAR(200));`)


    await db.query(`CREATE TABLE reviews
    (review_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    review_body TEXT NOT NULL,
    designer TEXT NOT NULL,
    review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category VARCHAR(200) REFERENCES categories(slug),
    owner VARCHAR(200) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    created_at TIMESTAMP);`)

    await db.query(`CREATE TABLE comments
    (comment_id SERIAL PRIMARY KEY,
        author VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE,
        created_at TIMESTAMP,
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        review_id INT REFERENCES reviews(review_id));`)

}

const insertCategories = async (categoryData) => {
    const formattedCategoryData = formatData(categoryData, ['slug', 'description'])
    const queryStr = format(`INSERT INTO categories
    (slug, description)
    VALUES
    %L 
    RETURNING *;`, formattedCategoryData
    );
    return await (await db.query(queryStr)).rows;
};
const insertUsers = async (userData) => {
    const formattedUserData = formatData(userData, ['username', 'avatar_url', 'name'])
    const queryStr = format(`INSERT INTO users
    (username, avatar_url, name)
    VALUES
    %L
    RETURNING *;`, formattedUserData
    );
    return await (await db.query(queryStr)).rows
}

const insertReviews = async (reviewData) => {
    const formattedReviewData = formatData(reviewData, ['title', 'designer', 'owner', 'review_img_url', 'review_body', 'created_at', 'category', 'votes']);
    const queryStr = format(`INSERT INTO reviews
    (title, designer, owner, review_img_url, review_body, created_at, category, votes)
    VALUES
    %L
    RETURNING *;`, formattedReviewData
    );
    return await (await db.query(queryStr)).rows
}

const insertComments = async (newCommentData) => {
    const formattedCommentData = formatData(newCommentData, ['body', 'author', 'review_id' , 'votes', 'created_at']);
    const queryStr = format(`INSERT INTO comments
    (body, author, review_id, votes, created_at)
    VALUES
    %L
    RETURNING *;`, formattedCommentData
    );
    return await (await db.query(queryStr)).rows
}

module.exports = { dropTables, createTables, insertCategories, insertUsers, insertReviews, insertComments };