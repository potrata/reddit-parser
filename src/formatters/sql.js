import R from 'ramda';

/**
 * @param {Object} options - provided options
 * @param {string} options.tableName - table name to insert data to
 * @returns {Function:: [a] -> string} Formatting function
 */
export default function format({ tableName }) {
    const formatRow = (item) => {
        const getKeys = R.pipe(R.keys, R.join(','));
        const getValues = R.pipe(R.values, R.map(value => `'${value}'`), R.join(','));

        return `insert into ${tableName} (${getKeys(item)}) values (${getValues(item)})`;
    };

    return R.pipe(R.map(formatRow), R.join('\n'));
}
