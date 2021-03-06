
const { expect } = require('@jest/globals');
const { formatData, createRefObj} = require('../utils/data-manipulation');

describe('formatData()', () => {
    test('Returns nested array of object values for single object', () => {
        const input = [{ slug: 'euro game', description: 'Abstact games that involve little luck' }];
        expect(formatData(input, ['slug', 'description'])).toEqual([['euro game', 'Abstact games that involve little luck']]);
    })
    test('Returns nested array of object values for multiple objects', () => {
        const input = [{ slug: 'euro game', description: 'Abstact games that involve little luck' }, { slug: "children's games", description: 'Games suitable for children' }];

        expect(formatData(input, ['slug', 'description'])).toEqual([['euro game', 'Abstact games that involve little luck'], [`children's games`, `Games suitable for children`]]);
    })
    test('Returns nested array of object values for objects with more properties', () => {
        const input = [{ slug: 'euro game', description: 'Abstact games that involve little luck' }, { slug: "children's games", description: 'Games suitable for children' },{ slug: 'euro game', description: 'Abstact games that involve little luck' }];

        expect(formatData(input, ['slug', 'description'])).toEqual([['euro game', 'Abstact games that involve little luck'], ["children's games", 'Games suitable for children'], ['euro game', 'Abstact games that involve little luck']]);
    })
    it('should not mutate the original data', () => {
        const input = [{ slug: 'euro game', description: 'Abstact games that involve little luck' }]
        expect(formatData(input, ['slug', 'description'])).not.toBe(input);

        })
        
    });
describe('create reference object', () => {
    test('should return an object', () => {
        const input = [{}];
        expect(createRefObj(input )).not.toBe(input);
    });
    test('should return a reference object made up of an array of objects', () => {
        const input = [{
            body: 'I loved this game too',
            belongs_to: 'Jenga',
            created_by: 'bainesface',
            votes: 17,
            created_at: new Date(1511354613389)
          }, {
            body: 'I loved this game too!',
            belongs_to: 'Jenga',
            created_by: 'bainesface',
            votes: 16,
            created_at: new Date(1511354613389)
          }]
          expect(createRefObj(input, 'body', 'votes')).toEqual({'I loved this game too': 17, 'I loved this game too!': 16});
    });
    test('should not mutate the original input', () => {
        const input = [{
            body: 'I loved this game too',
            belongs_to: 'Jenga',
            created_by: 'bainesface',
            votes: 17,
            created_at: new Date(1511354613389)
          }, {
            body: 'I loved this game too!',
            belongs_to: 'Jenga',
            created_by: 'bainesface',
            votes: 16,
            created_at: new Date(1511354613389)
          }]
          expect(createRefObj(input, 'body', 'votes')).not.toBe(input);
          })
})
