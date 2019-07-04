import React from 'react' 
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { meQuery } from '../../graphql/queries/me'
import { LOGOUT_MUTATION } from '../../graphql/mutations/logout'

const updateCacheAfterLogout = (cache, props) => {
    cache.writeQuery({
        query: meQuery,
        data: { me: null }
    })
    props.history.push('/')
}

const LogoutButton = props => (
    <Mutation
        mutation={LOGOUT_MUTATION}
        update={cache => updateCacheAfterLogout(cache, props)}>
        {logout => (
            <div onClick={logout}>
                Logout
            </div>
        )}
    </Mutation>
)

export default withRouter(LogoutButton)