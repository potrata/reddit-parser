import test from 'blue-tape';
import sort from './../../strategies/sort';

test('Sorting Data', (t) => {
    t.test('returns sorting function', (assert) => {
        const result = sort({});
        assert.equal(typeof result, 'function');
        assert.end();
    });

    t.test('returns empty array if no data presented at all', (assert) => {
        const result = sort({})([]);
        assert.equal(result.length, 0);
        assert.end();
    });

    t.test('returns array of data with only particular fields in right order', (assert) => {
        const result = sort({})([
            { score: 10, created_utc: 1, id: 1, title: 'a', someFieldA: 11, someFieldB: 12 },
        ]);
        assert.deepEqual(Object.keys(result[0]), ['id', 'title', 'created_utc', 'score']);
        assert.end();
    });

    t.test('returns array of data sorted by given field', (assert) => {
        const result = sort({ sortField: 'score' })([
            { score: 10, created_utc: 1, id: 1, title: 'a' },
            { score: 1, created_utc: 1, id: 2, title: 'b' },
            { score: 3, created_utc: 1, id: 3, title: 'c' },
        ]);

        assert.deepEqual(result.map(item => item.score), [1, 3, 10]);
        assert.end();
    });

    t.test('returns array of data sorted in descending order', (assert) => {
        const result = sort({ sortField: 'score', sortOrder: 'desc' })([
            { score: 230, created_utc: 1, id: 1, title: 'a' },
            { score: 1021, created_utc: 1, id: 2, title: 'b' },
            { score: 3, created_utc: 1, id: 3, title: 'c' },
        ]);

        assert.deepEqual(result.map(item => item.score), [1021, 230, 3]);
        assert.end();
    });
});
