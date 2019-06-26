import React from 'react'
import { Mutation, Query } from 'react-apollo'

import { CLOSEPOSITION } from '../graphql/mutations/closePosition'
import { CURRENCY_PAIR_INFO } from '../graphql/queries/currencyPairInfo'
import { meQuery } from '../graphql/queries/me'

const Pair = (props) => {
    console.log(props) 
    if(props.location.state) {
        const {createdAt, lotSize, openedAt, pair, position, id } = props.location.state.pair,
              { bankroll, name } = props.location.state.me,
              [fc, tc] = pair.split('/')
        return (
            <Query query={CURRENCY_PAIR_INFO} variables={{ fc, tc }}>
                {({ data, loading, error }) => {
                    if(loading) return <h1>Loading...</h1>
                    if(error) return `Error ${error}`
                    const { bidPrice, lastRefreshed } = data.currencyPairInfo,
                        pipDif = (bidPrice - openedAt).toFixed(4),
                        potentialProfitLoss = pipDif * lotSize 
                    
                    return  data && (
                        <div>
                            <h3>Pair Details</h3>
                            <div>
                                <p>{ name } your available balance: { bankroll.toLocaleString() +'.00' }</p> 
                                { position === 'long' && 
                                    <Mutation 
                                        mutation={CLOSEPOSITION} 
                                        variables={{ id, closedAt: +bidPrice }}
                                        refetchQueries={[{query: meQuery}]}
                                    >
                                        {(closePosition, { data, loading, error }) => {
                                            if(loading) return <p>Loading</p>
                                            if(error) {
                                                console.log(error)  
                                                return <small>Error: { error.message }</small>
                                            }
                                            return ( closePosition && 
                                                <>
                                                    <button onClick={() => {
                                                        alert('Are you sure?')
                                                        closePosition()
                                                    }}>Sell</button> 
                                                    {data && data.closePosition.message && ( 
                                                        <div className='open_position_modal'>
                                                            <p>{data && data.closePosition.message}!</p>
                                                        </div>
                                                    )}
                                                </>
                                            )
                                        }}
                                    </Mutation> 
                                }
                            </div>
                            <div>
                                <p><span>Currency Pair: </span>{pair}</p>
                                <p><span>Lot Size: </span>{lotSize.toLocaleString()+'.00'}</p>
                                <p><span>Opened At: </span>{openedAt}</p>
                                <p><span>Position: </span>{position}</p>
                                <p><span>Created At: </span>{createdAt}</p>
                                { position === 'long' ? (
                                    <>
                                        <br />
                                        <p><span>Current Bid Price: </span>{bidPrice}</p>
                                        <p><span>Last Refreshed: </span>{lastRefreshed}</p>
                                        <p><span>Current Pip Difference: </span>{pipDif}</p>
                                        <p><span>Potential PL: </span>{potentialProfitLoss.toLocaleString()+'.00'}</p>
                                    </>
                                ) : null }
                            </div>
                        </div>
                    )
                }}
            </Query>           
        )
    }
}

export default Pair 
