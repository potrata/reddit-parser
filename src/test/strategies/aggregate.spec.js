import test from 'blue-tape';
import aggregate from './../../strategies/aggregate';

test('Aggregating Data', (t) => {
    t.test('returns aggregating function', (assert) => {
        const result = aggregate({});
        assert.equal(typeof result, 'function');
        assert.end();
    });

    t.test('returns empty array if no data presented at all', (assert) => {
        const result = aggregate({})([]);
        assert.equal(result.length, 0);
        assert.end();
    });

    t.test('returns array of data with only particular fields in right order', (assert) => {
        const result = aggregate({})([
            { domain: 'a.com', score: 10, created_utc: 1, id: 1, title: 'a', someFieldA: 10 },
        ]);
        assert.deepEqual(Object.keys(result[0]), ['domain', 'count', 'score']);
        assert.end();
    });

    t.test('returns data grouped by domain key', (assert) => {
        const result = aggregate({})([
            { domain: 'a.com', score: 1, id: 1, title: 'a' },
            { domain: 'a.com', score: 10, id: 2, title: 'b' },
            { domain: 'b.com', score: 18, id: 3, title: 'c' },
        ]);
        assert.deepEqual(result.map(item => item.domain), ['a.com', 'b.com']);
        assert.end();
    });

    t.test('returns data with summed score for every domain', (assert) => {
        const result = aggregate({})([
            { domain: 'a.com', score: 1, id: 1, title: 'a' },
            { domain: 'a.com', score: 10, id: 2, title: 'b' },
            { domain: 'a.com', score: 18, id: 3, title: 'c' },
        ]);
        assert.equal(result[0].score, 29);
        assert.end();
    });

    t.test('returns data ordered by count for every domain', (assert) => {
        const result = aggregate({})([
            { domain: 'a.com', score: 2, id: 1, title: 'a' },
            { domain: 'a.com', score: 30, id: 2, title: 'b' },
            { domain: 'b.com', score: 8, id: 3, title: 'c' },
            { domain: 'b.com', score: 9, id: 4, title: 'd' },
            { domain: 'b.com', score: 34, id: 5, title: 'e' },
        ]);
        assert.deepEqual(result.map(item => item.count), [3, 2]);
        assert.end();
    });
});
