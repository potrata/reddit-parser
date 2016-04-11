import R from 'ramda';

const foldItems = R.reduce((acc, item) => {
    return {
        ...acc,
        count: acc.count + 1,
        score: acc.score + item.score,
    };
}, { count: 0, score: 0 });

export default function aggregate() {
    return R.pipe(
        R.map(R.pick(['id', 'score', 'domain'])),
        R.groupBy(R.prop('domain')),
        R.toPairs,
        R.reduce((acc, [domain, items]) => {
            return [...acc, { domain, ...foldItems(items) }];
        }, []),
        R.sortBy(R.prop('count')),
        R.reverse
    );
}
