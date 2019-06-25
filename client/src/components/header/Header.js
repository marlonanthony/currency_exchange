import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'

import { meQuery } from '../../graphql/queries/me'
import LogoutButton from '../auth/Logout'
import './Header.css'

function Header(props) {
    return (
        <div className='navigation'>
            <header><NavLink exact to='/'>Currency Exchange</NavLink></header>
            <Query query={meQuery}>
                {({ data, loading, error }) => {
                    if(loading) return <p>loading</p>
                    if(error) {
                        console.log(error) 
                        if(error.message.includes('Network error: Failed to fetch')) props.history.push('/login')
                        return `Error ${error}`
                    }
                    if(!data) return <div style={{ marginTop: 100 }}>Data is undefined</div>
                    if(!data.me) return (
                        <ul>
                            <li><NavLink exact to="/login">Login</NavLink></li>
                            <li><NavLink exact to='/register'>Sign Up</NavLink></li>
                        </ul>
                    )
                    return (
                        <ul>
                            <li><NavLink to='/account'>Account</NavLink></li>
                            <li><NavLink to='/chart'>Chart</NavLink></li>
                            <LogoutButton />
                        </ul>
                    )
                }}
            </Query>
        </div>
    )
}

export default withRouter(Header) 
