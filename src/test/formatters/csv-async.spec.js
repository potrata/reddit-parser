import test from 'blue-tape';
import format from './../../formatters/csv-async';

test('Formatting Data as CSV in async mode', (t) => {
    t.test('returns formatting function', (assert) => {
        const result = format({});
        assert.equal(typeof result, 'function');
        assert.end();
    });

    t.test('returns thenable function', (assert) => {
        const result = format({})([]);
        assert.equal(typeof result.then, 'function');
        assert.end();
    });
});
