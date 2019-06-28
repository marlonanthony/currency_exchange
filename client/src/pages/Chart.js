import React from 'react'
import { Line } from 'react-chartjs-2'
import { Query } from 'react-apollo'

import { MONTHLYTIMESERIES } from '../graphql/queries/monthlyTimeSeries'

const Chart = () => (
    <Query query={MONTHLYTIMESERIES} variables={{ fc: 'EUR', tc: 'USD' }}>
    {({ data, loading, error }) => {
        if(loading) return <h1>Loading...</h1>
        if(error) return `Error ${error}`
        if(data) {
            const labels = data.monthlyTimeSeries.timesArray
            const chartData = data.monthlyTimeSeries.valuesArray
            return (
                <div>
                    <h3>Chart</h3>
                    <Line data={{
                        labels,
                        datasets: [
                            {
                                label: `${'EUR'}/${'USD'} Time Series FX (Monthly)`,
                                fill: true,
                                lineTension: 0.1,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(75,192,192,1)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: chartData
                            }
                        ]
                    }} />
                </div>
            )
        }
    }}
    </Query>
    )

export default Chart