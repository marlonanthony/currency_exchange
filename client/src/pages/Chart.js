import React, { Component } from 'react'

export default class Chart extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        fetch(`https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=EUR&to_symbol=USD&apikey=demo`)
        .then(res => res.json()) 
        .then(res => {
            this.setState({ data: res })
            console.log(res) 
        }).catch(err => console.log(err))
    }
    render() {
        const timeSeries = this.state.data && this.state.data['Time Series FX (Monthly)']
        return (
            <div className='thingy'>
                <div>
                    {timeSeries && Object.keys(timeSeries).map((val, i) => (
                        <div key={i}>{val +':'}</div>
                    ))}
                </div>
                <div>
                    {timeSeries && Object.values(timeSeries).map((val, i) => (
                        <div key={i}>{val['4. close']}</div>
                    ))}
                </div>
            </div>
        )
    }
}
