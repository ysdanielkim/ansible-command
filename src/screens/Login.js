import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

class LoginScreen extends Component {
  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={this.props.onLogin}>Login</Button>
      </div>
    )
  }
}

LoginScreen.propTypes = {
  onLogin: PropTypes.func
}

export default LoginScreen
