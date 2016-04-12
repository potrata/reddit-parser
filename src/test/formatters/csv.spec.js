import test from 'blue-tape';
import format from './../../formatters/csv';

test('Formatting Data as CSV', (t) => {
    t.test('returns formatting function', (assert) => {
        const result = format({});
        assert.equal(typeof result, 'function');
        assert.end();
    });

    t.test('returns empty string if no data presented at all', (assert) => {
        const result = format({})([]);
        assert.equal(result, '');
        assert.end();
    });

    t.test('returns strings separated by line-breaks', (assert) => {
        const result = format({})([{ a: 1 }, { b: 2 }, { c: 3 }]);
        assert.equal(result.split('\n').length, 3);
        assert.end();
    });

    t.test('returns strings with values separated by given separator', (assert) => {
        const result = format({ separator: ';' })([{ a: 1, b: 2, c: 3 }]);
        assert.equal(result, '"1";"2";"3"');
        assert.end();
    });
});
