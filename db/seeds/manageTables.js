const format = require('pg-format');
const db = require('../../db/connection.js');
// const { formatData } = require('../../utils/data-manipulation');


const dropTables = async () => {
    await db.query('DROP TABLE IF EXISTS comments');
    await db.query('DROP TABLE IF EXISTS reviews');
    await db.query('DROP TABLE IF EXISTS categories');
    await db.query('DROP TABLE IF EXISTS users');
}

const createTables = async () => {

    await db.query(`CREATE TABLE categories
    (slug VARCHAR(200) NOT NULL PRIMARY KEY,
    description TEXT);`)

    await db.query(`CREATE TABLE users
    (username VARCHAR(200) NOT NULL PRIMARY KEY,
    avatar_url TEXT,
    name VARCHAR(200));`)


    await db.query(`CREATE TABLE reviews
    (review_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    review_body TEXT NOT NULL,
    designer TEXT,
    review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category VARCHAR(200) REFERENCES categories(slug),
    owner VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE,
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
<<<<<<< HEAD
    // const formattedCategoryData = formatData(categoryData, ['slug', 'description']) //formatData returns array of property values
=======
    const formattedCategoryData = formatData(categoryData, [slug, description]) //formatData returns array of property values
>>>>>>> 918d02868828113a376a589938c80f32256586fa
    const queryStr = format(`INSERT INTO categories
        (slug, description)
        VALUES
        %L 
         RETURNING *;`, categoryData.map(({ slug, description }) => [slug, description]));
          return await (await db.query(queryStr)).rows;
};

const insertUsers = async (userData) => {
<<<<<<< HEAD
    // const formattedUserData = formatData(userData, ['username', 'avatar_url', 'name'])
=======
    const formattedUserData = formatData(userData, [username, avatar_url, name])
>>>>>>> 918d02868828113a376a589938c80f32256586fa
    const queryStr = format(`INSERT INTO users
    (username, avatar_url, name)
    VALUES
    %L
    RETURNING *;`, userData.map(({ username, avatar_url, name }) => 
    [username, avatar_url, name])
    );
    const result =  await db.query(queryStr);
    return result.rows;
}

const insertReviews = async (reviewData) => {
    // console.log(reviewData);
<<<<<<< HEAD
    // const formattedReviewData = formatData(reviewData, ['title', 'designer', 'owner', 'review_img_url', 'review_body', 'category', 'votes']);
=======
    const formattedReviewData = formatData(reviewData, [title, designer, owner, review_img_url, review_body, category, votes]);
>>>>>>> 918d02868828113a376a589938c80f32256586fa
    const queryStr = format(`INSERT INTO reviews
    (title, designer, owner, review_img_url, review_body, category, created_at, votes)
    VALUES
    %L
    RETURNING *;`, reviewData.map(({title, designer, owner, review_img_url = `https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg`,
        review_body, category, created_at, votes = 0,}) =>
        [title, designer, owner, review_img_url, review_body, category, created_at, votes])
    );
    const result = await db.query(queryStr);
    return result.rows;
}

const insertComments = async (newCommentData) => {
<<<<<<< HEAD
    // const formattedCommentData = formatData(newCommentData, ['body', 'votes', 'author', 'review_id']);
=======
    const formattedCommentData = formatData(newCommentData, [body, votes, author, review_id]);
>>>>>>> 918d02868828113a376a589938c80f32256586fa
    const queryStr = format(`INSERT INTO comments
    (body, author, review_id, votes, created_at)
    VALUES
    %L
    RETURNING *;`, newCommentData.map(({ body, author, review_id, votes = 0, created_at }) => 
    [body, author, review_id, votes, created_at,]) 
    );
    const result = await db.query(queryStr);
    return result.rows;
}

module.exports = { dropTables, createTables, insertCategories, insertUsers, insertReviews, insertComments };


// SELECT reviews, comments