const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const endpoints = require('../endpoints.json');
const testData = require('../db/data/test-data/index.js');
const  seed  = require('../db/seeds/seed.js');
const { expect } = require('@jest/globals');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api and invalid path handling', () => {
        test('should respond with a JSON of all available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual(endpoints);
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
});

describe('/api/categories', () => {
    test('GET - status: 200, responds with an array of the newly inserted category objects', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body: { categories }}) => {
            expect(categories).toHaveLength(4);
            categories.forEach((category) => {
                expect(category).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String),
                });
            });
        });
    });
    test('POST - status: 201, responds with a category object after it has just been posted', () => {
        return request.agent(app)
        .post('/api/categories')
        .expect(201)
        .send({ 
            slug: 'boxing', 
            description: 'everyone has a punchers chance, come along and test your mettle!', })
        .then(({ body: { category }}) => {
            expect(category).toEqual({
            slug: "boxing",
            description: "everyone has a punchers chance, come along and test your mettle!"
            });
        });
    });
    test('ERROR - status: 400, responds with "slug field incomplete", if passed either an incomplete slug key-value pair, or if it is not in the request', () => {
    return request.agent(app)
    .post('/api/categories')
    .send({ description: 'everyone has a punchers chance, come along and test your mettle!' })
    .expect(400)
    .then(({ body: { msg }}) => {
        expect(msg).toEqual("slug field incomplete");
        })
    })
    test('ERROR - status 400, responds with "description field incomplete" if passed either an incomplete description value-pair, or if it is not in the request', () => {
        return request.agent(app)
        .post('/api/categories')
        .send({ slug: 'boxing' })
        .expect(400)
        .then(({ body: { msg }}) => {
            expect(msg).toEqual("description field incomplete")
        })
    })
})

describe('/api/reviews', () => {
        test('GET - status: 200, responds with an array of review objects', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body: { reviews }}) => {
            ;expect(reviews.length).toEqual(13);
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
        test('GET - status: 200, responds with all reviews, sorted by "created_at" descending (default)', () => {
        return request(app)
        .get('/api/reviews?')
        .expect(200)
        .then(({ body: { reviews }}) => {
            expect(reviews).toBeSortedBy('created_at', { descending: true });
        });
        });
        test.only('GET - status: 200, responsed with all reviews, sorted by "created_at ascending" ', () => {
        return request(app)
        .get('/api/reviews?order=asc')
        .expect(200)
        .then(({ body: { reviews }}) => {
            expect(reviews).toBeSortedBy('created_at', { ascending: true });

        });
        });
        test.only('GET - status:  200, responds with all reviews, sorted by votes descending', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes')
        .expect(200)
        .then(({ body: { reviews }}) => {
            expect(reviews).toBeSortedBy('votes', { descending: true });
            });
            });
        test.only('GET - status: 200, responds with all reviews, sorted by votes ascending', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes&&order=asc')
        .expect(200)
        .then(({ body: { reviews }}) => {
            expect(reviews).toBeSortedBy('votes', { ascending: true });
        });
            });
        test('GET - status: 200, responds with all the reviews, filtered by category', () => {
        return request(app)
        .get('/api/reviews?category=dexterity')
        .expect(200)
        .then(({ body: { reviews }}) => {
            reviews.forEach((review) => {
                expect(review.category).toBe('dexterity');
            });
        });
            });

        test('GET - status: 200, responds with all reviews linked to an owner specified in the query', () => {
        return request(app)
        .get('/api/reviews?owner=bainesface')
        .expect(200)
        .then(({ body: {reviews} }) => {
            reviews.forEach((review) => {
                expect(review.owner).toEqual('bainesface');
            });
        });
            });
        test.only('POST - status: 201, responds with a review after it has been posted', () => {
            return request.agent(app)
            .post('/api/reviews')
            .send({
                title: "Nice game, will recommend to my friends",
                designer: "Leslie Scott",
                owner: "bainesface",
                review_body: " I enjoyed this game very much, 10/10!",
                category: "euro game",
            })
            .expect(201)
            .then(({ body: { review }}) => {
                expect(review).toEqual({
                    review_id: 14,
                    title: "Nice game, will recommend to my friends",
                    designer: "Leslie Scott",
                    owner: "bainesface",
                    review_img_url:
                    'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    review_body: " I enjoyed this game very much, 10/10!",
                    category: "euro game",
                    created_at: expect.any(String),
                    votes: 0,
                    comment_count: 0,
                })
            })
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
        test('GET - status: 200, responds with an array containing the queried review, with a comment_count column added to it ', () => {
            const num = 3;
            return request(app)
            .get(`/api/reviews/${num}`)
            .expect(200)
            .then(({ body: { review }}) => {
                expect(review[0]).toMatchObject({
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
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("Review not found");
            });
        });
        test('ERROR - status: 400, responds with "Invalid input" when passed an incorrect data type', () => {
            return request(app)
            .get('/api/reviews/incorrect')
            .expect(400)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual( "Invalid input");
            });
        });
        test('PATCH - status 201, responds with a review object after its vote count has been updated', () => {
            return request.agent(app)
            .patch('/api/reviews/1')
            .send({ inc_votes: -1})
            .expect(201)
            .then(({ body : { review }}) => {
                expect(review[0]).toMatchObject({
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
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("Review not found");
            });
        });
        test('ERROR - status 400, responds with "Invalid input" when passed an incorrect inc_vote data type', () => {
            return request.agent(app)
            .patch('/api/reviews/:review_id')
            .send({ inc_votes : 'incorrect' })
            .expect(400)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("Invalid input");
            });
        });
});

describe('/api/reviews/:review_id/comments', () => {
        test('GET - status: 200, responds with all comments associated with the review_id in the query', () => {
            return request(app)
            .get(`/api/reviews/2/comments`)
            .expect(200)
            .then(({ body: { comments }}) => {
                comments.forEach((comment) => {
                    expect(comment.review_id).toBe(2);
                });
            });
        });
        test('ERROR - status: 404, responds with "No comments found" if given a review_id that is not in the database', () => {
            return request(app)
            .get(`/api/reviews/1000/comments`)
            .expect(400)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("No comments found");
            });
        });
        test('ERROR - status: 400 - should respond with "No comments found" if none found or given a review_id that isnt in the database', () => {
            return request(app)
            .get('/api/reviews/300/comments')
            .expect(400)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("No comments found");
            })
        });
        test('GET - status: 200, responds with all comments associated with the given review_id, sorted by the default (created_at, descending)', () => {
            const num = 3
            return request(app)
            .get(`/api/reviews/${num}/comments`)
            .expect(200)
            .then(({ body: { comments }}) => {
                expect(comments).toBeSortedBy('created_at', { descending: true });
                comments.forEach((comment) => {
                    expect(comment.review_id).toEqual(num);
                });
            });
        });
        test('GET - status: 200, responds with all comments associated with the given review_id, sorted by votes descending', () => {
            const num = 2;
            return request(app)
            .get(`/api/reviews/${num}/comments?sort_by=votes`)
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
            .then(({ body: { msg }}) => {
                expect({ body: { msg }}.body).toEqual({ msg: "Invalid order query" });
            });
        });
        test('POST - status: 201, responds with the comment after adding it to the database', () => {
          return request.agent(app)
          .post(`/api/reviews/2/comments`) 
          .send({ 
              body: 'Great game, wish I could play it all-day!', 
              username: 'bainesface'
             })
          .expect(201)
          .then(({ body: { comment }}) => {
              expect(comment[0]).hasOwnProperty('created_at');
              expect(comment[0]).toMatchObject({ author: "bainesface", 
              body: "Great game, wish I could play it all-day!",
              comment_id: 7,
              review_id: 2,
              votes: 0,
                });
            });
        });
        test('ERROR -  status: 404, responds with "Resource not found" when review_id is invalid', () => {
            return request.agent(app)
            .post(`/api/reviews/3000/comments`)
            .send({
                body: 'Amazing graphics, 10 out of 10!',
                username: 'mallionaire'
            })
            .expect(404)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("Resource not found");
            })
        });
        test('ERROR - status: 400, responds with "Invalid input" when passed an invalid/empty body', () => {
            return request.agent(app)
            .post(`/api/reviews/2/comments`)
            .send({
                body: '',
                username: 'bainesface'
            })
            .expect(400)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("Comment section is empty");
            })
        })
        test('ERROR - status 404, responds with "Resource not found" if given a author that does not exist ini the database ', () => {
            return request.agent(app)
            .post(`/api/reviews/3/comments`)
            .send({
                body: 'Amazing graphics, 10 out of 10!',
                username: 'Arteh97'
            })
            .expect(404)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("Resource not found");
            })
        });
            
});

describe('/api/comments/:comment_id', () => {
    test('DELETE - status: 204, should respond with no content after deleting a given comment (:comment_id)', () => {
        return request.agent(app)
        .delete('/api/comments/1')
        .expect(204)
        .then(() => {
            return request.agent(app)
            .delete('/api/comments/1')
            .expect(404)
            .then(({ body: { msg }}) => {
                expect(msg).toEqual("Comment not found");
            })
            })
        });
    test('PATCH - status: 201, should respond with a comment after its vote count has been updated', () => {
        return request.agent(app)
        .patch('/api/comments/2')
        .expect(201)
        .send({ inc_votes: 1 })
        .then(({ body: { comment }}) => {
            expect(comment[0]).toMatchObject({
                author: "mallionaire",
                body: "My dog loved this game too!",
                comment_id: 2,
                created_at: "2021-01-18T10:09:05.410Z",
                review_id: 3,
                votes: 14,
            });
        });
    });
    test('PATCH - status: 404, should responds with "Comment not found" if comment doesnt exist in the database', () => {
        return request(app)
        .patch('/api/comments/1000')
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body: { msg }}) => {
            expect(msg).toEqual("Comment not found");
        });
    });
    test('PATCH - status: 400, should respons with "Invalid input" if inc_votes data type is invalid', () => {
        return request(app)
        .patch('/api/comments/2')
        .send({ inc_votes: "ssadf" })
        .expect(400)
        .then(({ body: {msg }}) => {
            expect(msg).toEqual("Invalid input");
        });
    });
});

describe('/api/users', () => {
    test('GET - status: 200, responds with an array of usernames', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body : { users }}) => {
            expect(users.length).toEqual(4);
            expect(users).toEqual([
                    {
                      "username": "philippaclaire9"
                    },
                    {
                      "username": "mallionaire"
                    },
                    {
                      "username": "bainesface"
                    },
                    {
                      "username": "dav3rid"
                    }
                  ]
            )
        })   
    });
    test('GET - status: 200, responds with a user object, searched by its username', () => {
        return request(app)
        .get('/api/users/bainesface')
        .expect(200)
        .then(({ body: { user }}) => {
            expect(user[0]).toMatchObject({
                username: 'bainesface',
                avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
                name: 'sarah',
            })
        })
    })
    test('ERROR - status: 404, responds with "User not found" if username does not exist in the database ', () => {
        return request(app)
        .get('/api/users/arteh97')
        .expect(404)
        .then(({body: { msg }}) => {
            expect(msg).toEqual("User not found");
        });
    });
})

// describe('/')
