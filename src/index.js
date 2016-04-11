import { inspect } from 'util';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request-promise';
import R from 'ramda';

import config from './config';
import strategies from './strategies';
import formatters from './formatters';

const pickItems = R.pipe(
    JSON.parse,
    R.path(['data', 'children']),
    R.map(R.prop('data'))
);

const processData = (strategy, options) =>
    R.pipe(pickItems, strategies[strategy](options));

const formatData = (formatter, options) =>
    formatters[formatter](options);

const app = express();
app.use(bodyParser.json());

app.use('/', express.static(`${__dirname}/public`));

app.post('/', (req, res) => {
    const { url, strategy, format, options } = req.body;
    request
        .get(url)
        .then(processData(strategy, options))
        .then(formatData(format, options))
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

app.listen(config.port, config.host, () => {
   console.log(`Server listening at ${config.host}:${config.port}`);
});

