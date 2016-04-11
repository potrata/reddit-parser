import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            url: 'https://www.reddit.com/r/javascript/.json',
            strategy: 'sort',
            format: 'csv',
            options: {},
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
        return (
            <div id='app'>
                <form onSubmit={this.onSubmit}>
                    <label key='url'>URL:
                        <input
                            name='url'
                            type='text'
                            value={this.state.url}
                            onChange={this.onUrlChange}
                            style={{ width: '256px' }}
                        />
                    </label><br/>
                    <label key='strategy'>Strategy:
                        <select
                            value={this.state.strategy}
                            name='strategy'
                            onChange={this.onStrategyChange}
                            style={{ width: '256px' }}
                        >
                            <option value='sort'>Sort</option>
                            <option value='aggregate'>Aggregate</option>
                        </select>
                    </label><br/>
                    <label key='format'>Format:
                        <select
                            value={this.state.format}
                            name='format'
                            onChange={this.onFormatChange}
                            style={{ width: '256px' }}
                        >
                            <option value='csv'>CSV</option>
                            <option value='sql'>SQL</option>
                        </select>
                    </label><br/>
                    <input
                        type='submit'
                        value={this.state.isFetching ? 'Fetching...' : 'Submit'}
                        disabled={this.state.isFetching}
                    />
                </form><br/>
                <textarea value={this.state.result} style={{ width: '100%', height: '512px' }}/>
            </div>
        );
    }
}
