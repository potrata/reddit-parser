import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            url: 'https://www.reddit.com/r/javascript/.json',
            strategy: 'sort',
            format: 'csv',
            options: {
                tableName: 'results',
                separator: ';',
                sortOrder: 'asc',
                sortField: 'score',
            },
            result: '',
            isFetching: false,
        };
    }

    onUrlChange = (e) => {
        this.setState({ url: e.target.value });
    }

    onStrategyChange = (e) => {
        this.setState({ strategy: e.target.value });
    }

    onFormatChange = (e) => {
        this.setState({ format: e.target.value });
    }

    onTableNameChange = (e) => {
        this.setState({
            options: { ...this.state.options, tableName: e.target.value }
        });
    }

    onSeparatorChange = (e) => {
        this.setState({
            options: { ...this.state.options, separator: e.target.value }
        });
    }

    onSortOrderChange = (e) => {
        this.setState({
            options: { ...this.state.options, sortOrder: e.target.value }
        });
    }

    onSortFieldChange = (e) => {
        this.setState({
            options: { ...this.state.options, sortField: e.target.value }
        });
    }

    onSubmit = (e) => {
        const { url, strategy, format, options } = this.state;

        this.setState({ isFetching: true });
        e.preventDefault();
        axios.post('/', { url, strategy, format, options })
            .then(result => {
                this.setState({ result: result.data });
                return result;
            }).catch(err => {
                this.setState({ result: err });
                return err;
            }).then(() => this.setState({ isFetching: false }));
    }

    render() {
        const { url, strategy, format, options, isFetching, result } = this.state;

        return (
            <div id='app'>
                <form onSubmit={this.onSubmit}>
                    <label key='url'>URL:
                        <input
                            name='url'
                            type='text'
                            value={url}
                            onChange={this.onUrlChange}
                            style={{ width: '256px' }}
                        />
                    </label><br/>
                    <label key='strategy'>Strategy:
                        <select
                            value={strategy}
                            name='strategy'
                            onChange={this.onStrategyChange}
                            style={{ width: '256px' }}
                        >
                            <option value='sort'>Sort</option>
                            <option value='aggregate'>Aggregate</option>
                        </select>
                    </label><br/>
                    <div style={{ display: strategy === 'sort' ? 'block' : 'none' }}>
                        <label key='order'>Order:
                             <select
                                value={options.sortOrder}
                                name='order'
                                onChange={this.onSortOrderChange}
                                style={{ width: '256px' }}
                             >
                                <option value='asc'>Asc</option>
                                <option value='desc'>Desc</option>
                            </select>
                        </label><br/>
                        <label key='field'>Field:
                             <select
                                value={options.sortField}
                                name='field'
                                onChange={this.onSortFieldChange}
                                style={{ width: '256px' }}
                             >
                                <option value='score'>score</option>
                                <option value='created_utc'>created_utc</option>
                            </select>
                        </label><br/>
                    </div>
                    <label key='format'>Format:
                        <select
                            value={format}
                            name='format'
                            onChange={this.onFormatChange}
                            style={{ width: '256px' }}
                        >
                            <option value='csv'>CSV</option>
                            <option value='sql'>SQL</option>
                        </select>
                    </label><br/>
                    <hr/>
                    <div style={{ display: format === 'csv' ? 'block' : 'none' }}>
                        <label key='separator'>Separator:
                            <input
                                name='separator'
                                type='text'
                                maxLength='1'
                                value={options.separator}
                                onChange={this.onSeparatorChange}
                                style={{ width: '256px' }}
                            />
                        </label><br/>
                    </div>
                    <div style={{ display: format === 'sql' ? 'block' : 'none' }}>
                        <label key='tableName'>Table name:
                            <input
                                name='url'
                                type='text'
                                value={options.tableName}
                                onChange={this.onTableNameChange}
                                style={{ width: '256px' }}
                            />
                        </label><br/>
                    </div>
                    <input
                        type='submit'
                        value={isFetching ? 'Fetching...' : 'Submit'}
                        disabled={isFetching}
                    />
                </form><br/>
                <textarea value={result} style={{ width: '100%', height: '512px' }}/>
            </div>
        );
    }
}
