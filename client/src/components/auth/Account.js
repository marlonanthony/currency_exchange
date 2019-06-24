import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { meQuery } from '../../graphql/queries/me'

export default function Account() {
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
                return (
                    <div style={{ marginTop: 100 }}>
                        <p>{ data.me.name }</p>
                        <p>{ data.me.email }</p>
                    </div>
                )
            }}
        </Query>
    )
}