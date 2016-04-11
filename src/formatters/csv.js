import R from 'ramda';

/**
 * @param {string} separator - CSV fields separator
 * @returns {Function:: [a] -> String} Format function
 */
export default function format({ separator = ',' }) {
    const wrapWithQuotes = str => `"${str}"`;

    return R.pipe(
      R.map(R.pipe(R.values, R.map(wrapWithQuotes), R.join(separator))),
      R.join('\n')
    );
}
