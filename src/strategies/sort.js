import R from 'ramda';

const stringifyDateField = (item) => {
    const dateString = new Date(item.created_utc * 1000).toLocaleString();
    return { ...item, created_utc: dateString };
};

/**
 * @param {string} field - Field name to sort by
 * @param {string} [order = asc|desc] - Sorting order
 * @returns {Function:: [a] -> [a]} Sorting function
 */
export default function sort({ sortField, sortOrder = 'asc' }) {
    const sortFn = R.pipe(
        R.sortBy(R.prop(sortField)),
        R.map(R.pipe(
                R.pick(['id', 'title', 'created_utc', 'score']),
                stringifyDateField
        ))
    );

    return sortOrder === 'desc' ? R.pipe(sortFn, R.reverse) : sortFn;
}
