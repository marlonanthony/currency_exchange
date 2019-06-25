import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './components/header/Header'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Account from './components/auth/Account'
import Landing from './pages/Landing'
import './App.css'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' render={() => (
          <>
            <Header />
            <Route path='/register' component={Register} />
            <Route path='/account' component={Account} />
            <Route path='/settings' render={() => <div style={{marginTop: 100 }}>Bruh</div>} />
            <Route exact path='/' component={Landing} />
          </>
        )} />
      </Switch>
    </div>
  )
}

export default App
