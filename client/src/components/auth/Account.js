import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { meQuery } from '../../graphql/queries/me'
import { ADDFUNDS } from '../../graphql/mutations/addFunds'

const Account = props => (
    <Query query={meQuery}>
        {({ data, loading, error, client, refetch }) => {
            if(loading) return <p>loading</p>
            if(error) {
                console.log(error) 
                return `${error}`
            }
            if(!data) return <div>Data is undefined</div>
            if(!data.me) return <div><Link to='/login'>Please Login</Link></div>
                
            return (
                <div>
                    <h2>{data.me.name}</h2>
                    <div>
                        <p>Available Balance: { data.me.bankroll.toLocaleString() +'.00' }</p> 
                        <Mutation 
                            mutation={ADDFUNDS} 
                            variables={{amount: 1000000}}
                            refetchQueries={[{query: meQuery}]}
                        >
                            {(addFunds, { data, loading, error }) => {
                                if(loading) return <p>Loading</p>
                                if(error) {
                                    console.log(error)  
                                    return <small>Error: { error.message }</small>
                                }
                                return ( addFunds && 
                                    <>
                                        <button onClick={() => {
                                            alert('Are you sure?')
                                            addFunds()
                                        }}>Add Funds</button> 
                                        {data && data.addFunds.message && ( 
                                            <div className='open_position_modal'>
                                                <p>{data && data.addFunds.messege}!</p>
                                            </div>
                                        )}
                                    </>
                                )
                            }}
                        </Mutation>
                    </div>
                    <br />
                    <div>
                        {props.location.state && <h3>Recent Pair</h3>}
                        {props.location.state && <p>Pair: {props.location.state.data.openPosition.pair.pair}</p>}
                        {props.location.state && <p>Lot Size: {props.location.state.data.openPosition.pair.lotSize.toLocaleString() +'.00'}</p>}
                        {props.location.state && <p>Pip Dif: {props.location.state.data.openPosition.pair.openedAt}</p>}
                        {props.location.state && <p>Position: {props.location.state.data.openPosition.pair.position}</p>}
                    </div>
                    <br />
                    <h3>Currency Pairs</h3>
                    <div style={{width: 400, margin: 'auto' }}>
                        { data.me.pairs && data.me.pairs.map(pair => (
                            <div key={pair.id} style={{padding: 20}}>
                                <Link to={{ pathname: '/pair', state: { pair, me: data.me } }}>
                                    { pair.pair && <p><span>Currency Pair: </span>{pair.pair}</p> }
                                    { pair.lotSize && <p><span>Lot Size: </span>{pair.lotSize.toLocaleString() +'.00'}</p> }
                                    { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                                    { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt }</p> }
                                    { pair.closedAt && <p><span>Closed At: </span>{ pair.closedAt }</p> }
                                    { pair.pipDif && <p><span>Pip Dif: </span>{ pair.pipDif }</p> }
                                    { pair.profitLoss && <p><span>Profit/Loss: </span>{ pair.profitLoss }</p> }
                                    { pair.open ? <p><span>Open: </span>true</p> : <p><span>Open: </span>false</p> }
                                    { pair.createdAt && <p><span>Created At: </span>{ pair.createdAt }</p> }
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }}
    </Query>
)

export default Account