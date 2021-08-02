const request = require('supertest');
const app = require('../app');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const  seed  = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('status: 200 - all OK from api router', () => {
    console.log('1st Test')
    test('should respond with "all OK from the api router', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({ "msg": 'All OK from /api !' })
        })
    });
    test('status: 200 - responds with an array the newly inserted category objects', () => {
    return request(app)
    .get('/api/categories')
    .expect(200)
    .then((res) => {
        // console.log(res.body[0], '<-- first entry', res.body.length, '<-- array length');
        expect(res.body).toHaveLength(4);
        res.body.forEach((category) => {
            expect(category).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
            })
        })
    })
});
test('status: 200 - responds with an array of the newly inserted review objects', () => {
    return request(app)
    .get('/api/reviews')
    .expect(200)
    .then((res) => {
        // console.log(res.body.length, '<-- array length', res.body[0], '<-- first entry');
        expect(res.body).toHaveLength(13);
        res.body.forEach((review) => {
            expect(review).toMatchObject({
                title: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                category: expect.any(String),
                votes: expect.any(Number),
                })
            })
        }); 
    })
})

describe('Interacting with the reviews', () => {
    test('status: 200 - responds with the searched review, with a comment_count column added to it ', () => {
        const input = 3
        return request(app)
        .get(`/api/reviews/${input}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({
                title: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                category: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String), // shouldn't be a string, will come back to this.

            })
        })
        
    });
})