import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { meQuery } from '../../graphql/queries/me'

export default function Account(props) {
    console.log(props) 
    return (
        <Query query={meQuery}>
            {({ data, loading, error }) => {
                if(loading) return <p>loading</p>
                if(error) {
                    console.log(error) 
                    return `${error}`
                }
                if(!data) return <div style={{ marginTop: 100 }}>Data is undefined</div>
                if(!data.me) return <div style={{ marginTop: 100 }}><Link to='/login'>Please Login</Link></div>
                // if(data) {
                    
                    return (
                        <div style={{ marginTop: 100 }}>
                            {data.me && <h2>{data.me.name}</h2>}
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
                            {data.me.pairs && data.me.pairs.map(pair => (
                                <div key={pair.id} style={{padding: 20}}>
                                    { pair.pair && <p><span>Currency Pair: </span>{pair.pair}</p> }
                                    { pair.lotSize && <p><span>Lot Size: </span>{pair.lotSize.toLocaleString() +'.00'}</p> }
                                    { pair.position && <p><span>Position: </span>{ pair.position }</p> }
                                    { pair.openedAt && <p><span>Opened At: </span>{ pair.openedAt }</p> }
                                    { pair.closedAt && <p><span>Closed At: </span>{ pair.closedAt }</p> }
                                    { pair.pipDif && <p><span>Pip Dif: </span>{ pair.pipDif }</p> }
                                    { pair.profitLoss && <p><span>Profit/Loss: </span>{ pair.profitLoss }</p> }
                                    { pair.open ? <p><span>Open: </span>true</p> : <p><span>Open: </span>false</p> }
                                    { pair.createdAt && <p><span>Created At: </span>{ pair.createdAt }</p> }
                                </div>
                            ))}
                        </div>
                    )
                // }
            }}
        </Query>
    )
}