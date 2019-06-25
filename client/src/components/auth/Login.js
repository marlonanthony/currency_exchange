import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

import { meQuery } from '../../graphql/queries/me'
import { LOGINMUTATION } from '../../graphql/mutations/login'

export default function Login(props) {
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState('')
    return (
        <Mutation 
            mutation={LOGINMUTATION}
            update={(cache, { data }) => {
                if(!data || !data.login) return 
                cache.writeQuery({
                    query: meQuery,
                    data: { me: data.login }
                })
            }}>
            {(login, { client }) => ( 
                <div style={{textAlign: 'center', marginTop: 50 }}>
                    <form onSubmit={ async (e) => {
                        e.preventDefault()
                        client.resetStore() 
                        await login({variables: { email, password }})
                        props.history.push('/')
                    }} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <h1>Login</h1>
                        <input
                            required
                            name='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            style={{padding: 10, margin: '10px 0px', width: '50%'}}
                        />
                        <input
                            required
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value) }
                            placeholder='Enter your password'
                            style={{padding: 10, margin: '10px 0px', width: '50%'}}
                        />
                        <button type='submit' style={{padding: 10, margin: '10px 0px', width: '50%'}}>Login</button>
                    </form>
                </div>
            )}
        </Mutation>
    )
}
