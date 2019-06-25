import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'


import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import { OPENPOSITION } from '../graphql/mutations/openPosition'
import { meQuery } from '../graphql/queries/me'

const Landing = props => {
    const [currency, setCurrency] = useState('EUR'),
          [toCurrency, setToCurrency] = useState('USD'),
          [openedAt, setOpenedAt] = useState(0)
        //   [closedAt, setClosedAt] = useState(0)
    let me 

    return (
        <Query query={CURRENCY_PAIR_INFO} variables={{ fc: currency, tc: toCurrency }}>
            {({ data, loading, error, refetch, client }) => {
                if(loading) return <h1 style={{marginTop: 100}}>Loading...</h1>
                if(error) return `Error ${error}`
                if(data) {
                    const user = client.readQuery({ query: meQuery })
                    if(user && user.me) me = user.me

                    return (
                        <main style={{marginTop: 100 }}>
                            <div>
                                <select 
                                    value={currency}
                                    onChange={e => setCurrency(e.target.value)}>
                                    <option>EUR</option>
                                    <option>USD</option>
                                    <option>GBP</option>
                                    <option>NZD</option>
                                    <option>AUD</option>
                                </select>
                                <select 
                                    value={toCurrency}
                                    onChange={e => setToCurrency(e.target.value)}>
                                    <option>JPY</option>
                                    <option>CHF</option>
                                    <option>CAD</option>
                                    <option>USD</option>
                                </select>
                                <button onClick={() => refetch()}>Refresh</button>
                                { setOpenedAt(+data.currencyPairInfo.askPrice) }
                                {/* { setClosedAt(+data.currencyPairInfo.bidPrice) } */}
                                { me && (
                                    <Mutation
                                        mutation={OPENPOSITION}
                                        variables={{ pair: `${currency}/${toCurrency}`, lotSize: 100000, openedAt, position: 'long' }}>
                                        {(openPosition, { data, loading, error }) => {
                                        if(loading) return <p>Loading</p>
                                        if(error) {
                                            console.log(error)  
                                            return <small>Error: { error.message }</small>
                                        }
                                        return ( openPosition && 
                                            <>
                                                <button onClick={openPosition}>Buy</button>
                                                <p>{data && data.openPosition.message}</p>
                                            </>
                                        )
                                        }}
                                    </Mutation>
                                )}
                                { me && (
                                    <Mutation
                                        mutation={OPENPOSITION}
                                        variables={{ pair: `${currency}/${toCurrency}`, lotSize: 100000, openedAt, position: 'short' }}>
                                        {(openPosition, { data, loading, error }) => {
                                        if(loading) return <p>Loading</p>
                                        if(error) {
                                            console.log(error)  
                                            return <small>Error: { error.message }</small>
                                        }
                                        return ( openPosition && 
                                            <>
                                                <button onClick={openPosition}>Sell</button>
                                                <p>{data && data.openPosition.message}</p>
                                            </>
                                        )
                                        }}
                                    </Mutation>
                                )}
                            </div>
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