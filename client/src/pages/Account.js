import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'

import { meQuery } from '../graphql/queries/me'
import { ADDFUNDS } from '../graphql/mutations/addFunds'
import Spinner from '../components/spinner/Spinner'

const Account = props => {
    const [open, setOpen] = useState(true)
    return (
        <Query query={meQuery}>
        {({ data, loading, error }) => {
            if(loading) return <Spinner />
            if(error) {
                console.log(error) 
                return `${error}`
            }
            if(!data) return <div>Data is undefined</div>
            if(!data.me) return <Redirect to='/login' />
            let count = 0
            data.me.pairs.forEach(pair => {
                if(!pair.open && pair.profitLoss) {
                    count += pair.profitLoss
                } 
            })
            return (
                <div style={{ paddingTop: 50 }}>
                    <h2>{data.me.name}</h2>
                    <div>
                        <p><span>Available Balance: </span>{ data.me.bankroll.toLocaleString() +'.00' }</p> 
                        <p><span>Total P/L: </span>{count}</p>
                        <Mutation 
                            mutation={ADDFUNDS} 
                            variables={{amount: 1000000}}
                            refetchQueries={[{query: meQuery}]}
                        >
                            {(addFunds, { data, loading, error }) => {
                                if(loading) return <Spinner />
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
                    { props.location.state && <div>
                        <h3>New Position</h3>
                        <div className='pair_divs' style={{ width: 400, margin: '10px auto' }}>
                            <p><span>Pair: </span>{props.location.state.data.openPosition.pair.pair}</p>
                            <p><span>Lot Size: </span>{props.location.state.data.openPosition.pair.lotSize.toLocaleString() +'.00'}</p>
                            <p><span>Pip Dif: </span>{props.location.state.data.openPosition.pair.openedAt}</p>
                            <p><span>Position: </span>{props.location.state.data.openPosition.pair.position}</p>
                        </div>
                    </div>}
                    <br />
                    <h3>Currency Pairs</h3>
                    <button onClick={() => setOpen(true)}>open</button>
                    <button onClick={() => setOpen(false)}>closed</button>
                    <div style={{width: 400, margin: 'auto' }}>
                        { data.me.pairs && data.me.pairs.map(pair => ( pair.open && open &&
                            <div className='pair_divs' key={pair.id} style={{ margin: 10 }}>
                                    <Link to={{ pathname: '/pair', state: { pair, me: data.me } }}>
                                        { pair.pair && <p><span>Currency Pair: </span>{pair.pair}</p> }
                                        { pair.lotSize && <p><span>Lot Size: </span>{pair.lotSize.toLocaleString() +'.00'}</p> }
                                        { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                                        { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
                                        { pair.open ? <p><span>Open: </span>true</p> : <p><span>Open: </span>false</p> }
                                        { pair.createdAt && <p><span>Created At: </span>{ new Date(+pair.createdAt).toLocaleString() }</p> }
                                    </Link>
                            </div>
                        ))}
                        { data.me.pairs && data.me.pairs.map(pair => ( !pair.open && !open &&
                            <div className='pair_divs' key={pair.id} style={{ margin: 10 }}>
                                    <div>
                                        { pair.pair && <p><span>Currency Pair: </span>{pair.pair}</p> }
                                        { pair.lotSize && <p><span>Lot Size: </span>{pair.lotSize.toLocaleString() +'.00'}</p> }
                                        { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                                        { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt.toFixed(4) }</p> }
                                        { pair.closedAt && <p><span>Closed At: </span>{ pair.closedAt.toFixed(4) }</p> }
                                        { pair.pipDif && <p><span>Pip Dif: </span>{ pair.pipDif }</p> }
                                        { pair.profitLoss && <p><span>Profit/Loss: </span>{ pair.profitLoss.toFixed(2) }</p> }
                                        { pair.open ? <p><span>Open: </span>true</p> : <p><span>Open: </span>false</p> }
                                        { pair.createdAt && <p><span>Created At: </span>{ new Date(+pair.createdAt).toLocaleString() }</p> }
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }}
        </Query>
    )
}

export default Account