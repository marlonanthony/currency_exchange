import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

import { REGISTERMUTATION } from '../../graphql/mutations/register'

export default function Register(props) {
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [name, setName] = useState('') 
    return (
        <Mutation mutation={REGISTERMUTATION}>
            {register => ( 
                <div className='register'>
                    <form onSubmit={ async e => {
                        e.preventDefault()
                        await register({variables: { email, password, name }})
                        props.history.push('/login')
                    }}>
                        <h1>Sign Up</h1>
                        <input
                            required
                            name='email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            
                        />
                        <input
                            required
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value) }
                            placeholder='Enter your password'
                            
                        />
                        <input
                            required
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value) }
                            placeholder='Enter your name'
                            
                        />
                        <button type='submit' >SignUp</button>
                    </form>
                </div>
            )}
        </Mutation>
    )
}
