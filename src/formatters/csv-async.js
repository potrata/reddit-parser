import R from 'ramda';

const delay = ms => data => new Promise(resolve => {
    setTimeout(() => resolve(data), ms);
});

/**
 * @param {Object} options - provided options
 * @param {string} options.separator - CSV field separator
 * @returns {Function:: [a] -> Promise -> string} Formatting function
 */
export default function format({ separator = ',' }) {
    const wrapWithQuotes = str => `"${str}"`;

    return R.pipe(
      R.map(R.pipe(R.values, R.map(wrapWithQuotes), R.join(separator))),
      R.join('\n'),
      delay(1000)
    );
}
