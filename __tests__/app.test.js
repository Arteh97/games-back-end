const request = require('supertest');
const app = require('../app');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const  seed  = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api, table seeding and invalid path handling', () => {
    test('should respond with "all OK from the api router', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({ "msg": 'All OK from /api !' })
        })
    });
    test("GET - status: 404 - should respond with 'Invalid Path' if given an incorrect path",    () => {
        return request(app)
        .get('/abc')
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({ "err": "Invalid Path"})
        })
    });
    test('GET - status: 200 - responds with an array the newly inserted category objects', () => {
    return request(app)
    .get('/api/categories')
    .expect(200)
    .then((res) => {
        console.log(res.body[0], '<-- first entry', res.body.length, '<-- array length');
        expect(res.body).toHaveLength(4);
        res.body.forEach((category) => {
            expect(category).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
            })
        })
    })
    });
    test('GET - status: 200 - responds with an array of the newly inserted review objects', () => {
    return request(app)
    .get('/api/reviews')
    .expect(200)
    .then((res) => {
        console.log(res.body.length, '<-- array length', res.body[0], '<-- first entry');
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
});
// all tests passing!

// error handling for - a review that doesn't exist, invalid syntax etc...
describe.only('/api/reviews', () => {
    test('GET - status: 200 - responds with the searched review, with a comment_count column added to it ', () => {
        const num = 3
        return request(app)
        .get(`/api/reviews/${num}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({
                    review_id: 3,
                    title: 'Ultimate Werewolf',
                    designer: 'Akihisa Okui',
                    owner: 'bainesface',
                    review_img_url:
                      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: "We couldn't find the werewolf!",
                    category: 'social deduction',
                    created_at: expect.any(String),
                    votes: 5
                })
            })       
    }); 
    test('GET - status: 404 - responds with "Review not found" if given a review_id that is not in the database', () => {
        return request(app)
        .get('/api/reviews/10000')
        .expect(404)
        .then((error) => {
            expect(error.body).toEqual({ msg: "Review Not Found" });
        });
    });
    test('GET - status: 400 - responds with "bad request" when passed an incorrect data type', () => {
        return request(app)
        .get('/api/reviews/incorrect')
        .expect(400)
        .then((error) => {
            expect(error.body).toEqual({ msg: "Bad Request" });
        });
    });


    // test('PATCH - status 201 - responds with a review after its vote count has been updated', () => {
    //     return request.agent(app)
    //     .patch('/api/reviews/:review_id')
    //     .expect(201)
    //     .then((response) => {
    //         expect(response.body).toMatchObject({
    //             review_id: expect.any(Number),
    //             title: expect.any(String),
    //             designer: expect.any(String),
    //             owner: expect.any(String),
    //             review_img_url: expect.any(String),
    //             review_body: expect.any(String),
    //             category: expect.any(String),
    //             votes: expect.any(Number),
    //         })

    //     })
    // });
})