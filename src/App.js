import React, { Component } from 'react'

import LoginScreen from './screens/Login'
import CommandScreen from './screens/Command'

class App extends Component {
  state = {
    isAuthenticated: true,
    server: null,
  }

  login () {
    this.setState({ isAuthenticated: true })
  }

  logout () {
    this.setState({ isAuthenticated: false })
  }

  render () {
    return (
      this.state.isAuthenticated ?
        <CommandScreen onLogout={this.logout.bind(this)}/> :
        <LoginScreen onLogin={this.login.bind(this)}/>
    )
  }
}

export default App
