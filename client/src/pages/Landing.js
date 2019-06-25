import React, { useState } from 'react'
import { Query } from 'react-apollo'

import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'

const Landing = props => {
    const [currency, setCurrency] = useState('EUR'),
          [toCurrency, setToCurrency] = useState('USD')

    return (
        <Query query={CURRENCY_PAIR_INFO} variables={{ fc: currency, tc: toCurrency }}>
            {({ data, loading, error, refetch }) => {
                if(loading) return <h1 style={{marginTop: 100}}>Loading...</h1>
                if(error) return `Error ${error}`
                if(data) {
                return (
                    <main style={{marginTop: 100}}>
                        <select 
                            name='currency'
                            value={currency}
                            onChange={e => setCurrency(e.target.value)}
                        >
                            <option>EUR</option>
                            <option>USD</option>
                            <option>GBP</option>
                            <option>NZD</option>
                            <option>AUD</option>
                        </select>
                        <select 
                            name='toCurrency'
                            value={toCurrency}
                            onChange={e => setToCurrency(e.target.value)}
                        >
                            <option>JPY</option>
                            <option>CHF</option>
                            <option>CAD</option>
                            <option>USD</option>
                        </select>
                        <button onClick={() => refetch()}>Refresh</button>
                        {
                            data && data.currencyPairInfo && Object.keys(data.currencyPairInfo).map(val =>(
                                <main key={Math.random()}>
                                    <div>{val && `${val}:`}</div>
                                    <div>{data.currencyPairInfo[val] && `${data.currencyPairInfo[val]}`}</div>
                                </main>
                            ))
                        }
                    </main>
                )
                }
            }}
        </Query>
    )
}

export default Landing 