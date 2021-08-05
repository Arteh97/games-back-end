const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const { copyWithin } = require('../db/data/test-data/categories');
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
        });
        });
        test("GET - status: 404,  should respond with 'Invalid Path' if given an incorrect path",    () => {
        return request(app)
        .get('/abc')
        .expect(404)
        .then(({ body: { msg }}) => {
            expect(msg).toEqual("Invalid Path")
        })
        });
        test('GET - status: 200, responds with an array the newly inserted category objects', () => {
    return request(app)
    .get('/api/categories')
    .expect(200)
    .then((response) => {
        // console.log(response.body[0], '<-- first entry', response.body.length, '<-- array length');
        expect(response.body).toHaveLength(4);
        response.body.forEach((category) => {
            expect(category).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
            });
        });
    });
        });
        test('GET - status: 200, responds with an array of the newly inserted review objects', () => {
    return request(app)
    .get('/api/reviews')
    .expect(200)
    .then(({ body: { reviews }}) => {
        // console.log(reviews.length, '<-- array length', reviews[0], '<-- first entry');
        expect(reviews).toHaveLength(13);
        reviews.forEach((review) => {
            expect(review).toMatchObject({
                title: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                category: expect.any(String),
                votes: expect.any(Number),
                });
            });
        }); 
        });
});
// all tests passing!

// Happy Path then Sad Path

// error handling for - a review that doesn't exist, invalid syntax etc...
describe('/api/reviews', () => {
        test('GET - status: 200, responds with an array of review objects', () => {
        // should accept queries sort_by, order, category
        // error handle for if any of the query is invalid
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((response) => {
            // console.log(response.body)
            ;expect(response.body.reviews.length).toEqual(13);
        });
        });
        test('GET - status: 200, responds with reviews sorted by "created_at" descending (default)', () => {
        return request(app)
        .get('/api/reviews?')
        .expect(200)
        .then(({ body: { reviews }}) => {
            const copy = [...reviews]
            const sorted = copy.sort(function(obj1, obj2) {
                return obj1.created_at - obj2.created_at;
            });
            expect(reviews).toEqual(sorted);
            expect(reviews).not.toBe(sorted);
        });
        });
        test('GET - status: 200, responsed with reviews sorted by "created_at ascending" ', () => {
        return request(app)
        .get('/api/reviews?order=asc')
        .expect(200)
        .then(({ body: { reviews }}) => {
            const copy = [...reviews]
            const sorted = copy.sort(function(obj1, obj2) {
                return obj2.created_at - obj1.created_at;
            });
            expect(reviews).toEqual(sorted);
            expect(reviews).not.toBe(sorted);
        });
        });
        test('GET - status:  200, responds with reviews sorted by votes descending', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes')
        .expect(200)
        .then(({ body: { reviews }}) => {
            const copy = [...reviews]
            const sorted = copy.sort(function(obj1, obj2) {
                return obj2.votes - obj1.votes;
            });
            // console.log(sorted);
            expect(reviews).toEqual(sorted);
            expect(reviews).not.toBe(sorted);
            });
            });
        test('GET - status: 200, responds with reviews sorted by votes ascending', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes&&order=asc')
        .expect(200)
        .then(({ body: { reviews }}) => {
        const copy = [...reviews]
        const sorted = copy.sort(function(obj1, obj2) {
            return obj1.votes - obj2.votes;
        });
        // console.log(sorted);
        expect(reviews).toEqual(sorted);
        expect(reviews).not.toBe(sorted);
        });
            });
        test('GET - status: 200, responds with the reviews filtered by category', () => {
        return request(app)
        .get('/api/reviews?category=dexterity')
        .expect(200)
        .then(({ body: { reviews }}) => {
            reviews.forEach((review) => {
                expect(review.category).toBe('dexterity');
            });
        });
            });

        test('GET - status: 200, responds with the reviews owner by a specific owner', () => {
        return request(app)
        .get('/api/reviews?owner=bainesface')
        .expect(200)
        .then(({ body: {reviews} }) => {
            reviews.forEach((review) => {
                expect(review.owner).toEqual('bainesface');
            });
        });
            });
        test('ERROR - status 400, responds with "Invalid sort_by query" when provided a non-valid column', () => {
        return request(app)
        .get('/api/reviews?sort_by=northcoders')
        .expect(400)
        .then(({body: { msg }}) => {
            expect(msg).toBe("Invalid sort query");
        });
            });
            test('ERROR - status: 400, responds with "Invalid order query" if given a non-valid order data-type', () => {
                return request(app)
                .get('/api/reviews?sort_by=votes&order=not-valid')
                .expect(400)
                .then((error) => {
                    expect(error.body).toEqual({ msg: "Invalid order query" });
                });
            });
        });

describe('/api/reviews/:review_id', () => {
        test('GET - status: 200, responds with the searched review, with a comment_count column added to it ', () => {
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
                        votes: 5,
                        comment_count: expect.any(String),
                    });
                }); 
        }); 
        test('ERROR - status: 404, responds with "Review not found" if given a review_id that is not in the database', () => {
            return request(app)
            .get('/api/reviews/10000')
            .expect(404)
            .then((error) => {
                expect(error.body).toEqual({ msg: "Review not found" });
            });
        });
        test('ERROR - status: 400, responds with "Bad Request" when passed an incorrect data type', () => {
            return request(app)
            .get('/api/reviews/incorrect')
            .expect(400)
            .then((error) => {
                expect(error.body).toEqual({ msg: "Bad Request" });
            });
        });
        test('PATCH - status 201, responds with a review after its vote count has been updated', () => {
            return request.agent(app)
            .patch('/api/reviews/1')
            .send({ inc_votes: -1})
            .expect(201)
            .then((response) => {
                expect(response.body).toMatchObject({
                    review_id: 1,
                    title: 'Agricola',
                    designer: 'Uwe Rosenberg',
                    owner: 'mallionaire',
                    review_img_url:
                      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: 'Farmyard fun!',
                    category: 'euro game',
                    created_at: expect.any(String),
                    votes: 0
                });
    
            });
        });
        test('ERROR - status 404, responds with "Review not found" if given a review_id that is not in the database', () => {
            return request.agent(app)
            .patch('/api/reviews/10000')
            .send({ inc_votes: 1 })
            .expect(404)
            .then((error) => {
                expect(error.body).toEqual({ msg: "Review not found"});
            });
        });
        test('ERROR - status 400, responds with "Bad Request" when passed an incorrect inc_vote data type', () => {
            return request.agent(app)
            .patch('/api/reviews/:review_id')
            .send({ inc_votes : 'incorrect' })
            .expect(400)
            .then((error) => {
                expect(error.body).toEqual({ msg: "Bad Request"});
            });
        });
});

// use jest matcher - expect().toBeSortedBy('column', { asc/desc: true/false });


describe('/api/reviews/:review_id/comments', () => {
        test.only('GET - status: 200, responds with all comments associated with the given review_id', () => {
            return request(app)
            .get(`/api/reviews/1/comments?sort_by=votes`)
            .expect(200)
            .then(({ body: { comments }}) => {
                console.log(comments);
                comments.forEach((comment) => {
                    expect(comment.review_id).toBe(num);
                });
            });
        });
        test('ERROR - status: 404, responds with "Review not found" if given a review_id that is not in the database', () => {
            return request(app)
            .get(`/api/reviews/1000/comments`)
            .expect(404)
            .then((error) => {
                expect(error.body).toEqual({ msg: "Review not found"});
                // console.log(comments);
            });
        });

        test('GET - status: 200, responds with all comments associated with the given review_id, sorted by the default (created_at, descending)', () => {
            const num = 3
            return request(app)
            .get(`/api/reviews/${num}/comments`)
            .expect(200)
            .then(({ body: { comments }}) => {
                const copy = [...comments]
                const check = copy.sort(function (com1, com2) {
                    return com2.created_at - com1.created_at;
                });
                expect(comments).toEqual(copy)
                expect(comments).not.toBe(copy);
                comments.forEach((comment) => {
                    expect(comment.review_id).toEqual(num);
                });
            });
        });
        test('GET - status: 200, responds with all comments associated with the given review_id, sorted by votes descending(default)', () => {
            const num = 2;
            return request(app)
            .get(`/api/reviews/${num}/comments`)
            .expect(200)
            .then(({ body: { comments }}) => {
                // console.log(comments);
                expect(comments).toBeSortedBy('votes', { descending: true });
            });
        });
        test('GET - status: 200, responds with all comments associated with the given review_id, sorted by votes ascending', () => {
            const num = 2;
            return request(app)
            .get(`/api/reviews/${num}/comments?sort_by=votes&order=asc`)
            .expect(200)
            .then(({ body: { comments }}) => {
                expect(comments).toBeSortedBy('votes', { ascending: true });
            });
        });
        test('GET - status: 200, responds, with all comments associated with the given review_id, sorted by comment_id ascending', () => {
            const num = 2;
            return request(app)
            .get(`/api/reviews/${num}/comments?sort_by=comment_id&order=asc`)
            .expect(200)
            .then(({ body: { comments }}) => {
                expect(comments).toBeSortedBy('comment_id', { ascending: true });
            });
        });
        test('ERROR - status: 400, responds with "Invalid sort query" if given a non-valid column', () => {
            return request(app)
            .get('/api/reviews/10/comments?sort_by=address')
            .expect(400)
            .then((error) => {
                expect(error.body).toEqual({ msg: "Invalid sort query"});
            })
        });
        test('ERROR - status: 400, responds with "Invalid order query" if not given "asc" or "desc" ', () => {
            return request(app)
            .get('/api/reviews/:review_id/comments?sort_by=votes&order=not-valid')
            .expect(400)
            .then((error) => {
                expect(error.body).toEqual({ msg: "Invalid order query" });
            });
        });
        test('POST - status: 201, responds with the comment after adding it to the database', () => {
            const num = 4
          return request.agent(app)
          .post(`/api/reviews/${num}/comments`) 
          .send({ body: 'Great game, wish I could play it all-day!', username: 'Arteh97' })
          .expect(201)
          .then(({ body: { comment }}) => {
              expect(comment).toEqual({ username: 'Arteh97', body: 'Great game, wish I could play it all-day!' });
          })
        
        })
})