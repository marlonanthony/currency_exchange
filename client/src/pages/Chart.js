import React from 'react'
import { Query } from 'react-apollo'

import { MONTHLYTIMESERIES } from '../graphql/queries/monthlyTimeSeries'

const Chart = () => (

    <Query query={MONTHLYTIMESERIES} variables={{ fc: 'EUR', tc: 'USD' }}>
            {({ data, loading, error }) => {
                if(loading) return <h1>Loading...</h1>
                if(error) return `Error ${error}`
                return data && (
                    <div className='chart'>
                        <div>
                            {data.monthlyTimeSeries.timesArray.map((time, i) => (
                                <p key={i}>{`${time}: `}</p>
                            ))}
                        </div>
                        <div>
                            {data.monthlyTimeSeries.valuesArray.map((value, i) => (
                                <p key={i}>{value}</p>
                            ))}
                        </div>
                    </div>
                )
            }}
    </Query>
)

export default Chart