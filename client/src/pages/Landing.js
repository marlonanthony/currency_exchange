import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

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
                if(loading) return <h1>Loading...</h1>
                if(error) return `Error ${error}`
                if(data) {
                    const user = client.readQuery({ query: meQuery })
                    if(user && user.me) me = user.me
                    return (
                        <main>
                            { user.me && user.me.bankroll && <p>Available Balance {user.me.bankroll.toLocaleString() +'.00'}</p> }
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
                                        variables={{ pair: `${currency}/${toCurrency}`, lotSize: 100000, openedAt, position: 'long' }}
                                        update={cache => {
                                            const user = cache.readQuery({ query: meQuery })
                                            const data = user.me.bankroll -= 100000
                                            cache.writeQuery({ query: meQuery, data })
                                        }}
                                    >
                                        {(openPosition, { data, loading, error }) => {
                                            if(loading) return <p>Loading</p>
                                            if(error) {
                                                console.log(error)  
                                                return <small>Error: { error.message }</small>
                                            }
                                            return ( openPosition && 
                                                <>
                                                    <button onClick={() => {
                                                        alert('Are you sure?')
                                                        openPosition()
                                                    }}>Buy</button> 
                                                    {data && data.openPosition.message && ( 
                                                        <div className='open_position_modal'>
                                                            <p>{data && data.openPosition.message}!</p>
                                                            <p>Currency Pair: {data.openPosition.pair.pair}</p>
                                                            <p>Lot Size: {data.openPosition.pair.lotSize.toLocaleString() +'.00'}</p>
                                                            <p>Pip Dif: {data.openPosition.pair.openedAt}</p>
                                                            <p>Position: {data.openPosition.pair.position}</p>
                                                            <Link to={{ pathname: '/account', state: { data } }}>{data && data.openPosition.message && 'Details'}</Link>
                                                        </div>
                                                    )}
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
                                data && data.currencyPairInfo && Object.keys(data.currencyPairInfo).map((val, i) =>(
                                    <main key={i}>
                                        <div>
                                            <p>{val && `${val}: ${data.currencyPairInfo[val]}`}</p>
                                        </div>
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