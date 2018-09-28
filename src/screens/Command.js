import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button/Button'
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import TextField from '@material-ui/core/TextField/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { Keyboard } from '@material-ui/icons'
import * as API from '../services/api'

class CommandScreen extends Component {
  state = {
    isLoading: false,
    host: 'example.com',
    command: '',
    response: '',
  }

  inputRef = null

  componentDidMount () {
    this.inputRef.addEventListener('keydown', this.onCommandKeyDown.bind(this))
  }

  componentWillUnmount () {
    this.inputRef.removeEventListener('keydown', this.onCommandKeyDown.bind(this))
  }

  onCommandKeyDown (event) {
    if (event.key === 'Enter') {
      this.sendRequest()
    }
  }

  async sendRequest () {
    this.setState({ isLoading: true })

    const response = await API.makeRequest(`http://${this.state.host}/remote-call?command=${this.state.command}`)

    this.setState({ isLoading: false, response })
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Keyboard style={{ paddingRight: 10 }}/>
            <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
              Ansible Command
            </Typography>
            <Button color="inherit" onClick={this.props.onLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <TextField
              select
              label="Select Ansible Instance"
              className={classes.hostSelector}
              value={this.state.host}
              onChange={event => this.setState({ host: event.target.value })}
              margin="normal"
              variant="outlined"
            >
              <MenuItem key="1" value="example.com">
                Default
              </MenuItem>
            </TextField>
            <TextField
              disabled={this.state.isLoading}
              className={classes.commandInput}
              InputLabelProps={{ shrink: true }}
              inputRef={ref => this.inputRef = ref}
              label="Command"
              margin="normal"
              onChange={event => this.setState({ command: event.target.value })}
              placeholder="Enter your Ansible command here"
              value={this.state.command}
              variant="outlined"
            />
          </div>
          {!this.state.isLoading || <LinearProgress/>}
          <code style={{ whiteSpace: 'pre', borderWidth: '1px' }}>
            {this.state.response}
          </code>
        </div>
      </div>
    )
  }
}

CommandScreen.propTypes = {
  onLogout: PropTypes.func,
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  hostSelector: {
    flexBasis: 200,
    paddingRight: 10
  },
  commandInput: {
    flexGrow: 1
  }
})

export default withStyles(styles)(CommandScreen)
