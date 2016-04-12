import test from 'blue-tape';
import format from './../../formatters/sql';

test('Formatting Data as SQL', (t) => {
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
        const result = format({ tableName: 'test' })([{ a: 1 }, { b: 2 }, { c: 3 }]);
        assert.equal(result.split('\n').length, 3);
        assert.end();
    });

    t.test('returns strings with using table name, provided in options', (assert) => {
        const result = format({ tableName: 'test' })([{ a: 1 }]);
        assert.equal(result.split(' ')[2], 'test');
        assert.end();
    });

    t.test('returns strings with right sql notation', (assert) => {
        const result = format({ tableName: 'test' })([{ a: 1, b: 2, c: 3 }]);
        assert.equal(result, 'insert into test (a,b,c) values (\'1\',\'2\',\'3\')');
        assert.end();
    });
});
