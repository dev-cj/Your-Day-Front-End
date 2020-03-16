import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import 'bulma/css/bulma.css'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import createBrowserHistory from './history'
import { connect } from 'react-redux'
import Feed from './Components/feed/feed'
import HelloUser from './Components/hello user/helloUser'
import LoginControl from './Components/LoginControl/LoginControl'
import { getPosts } from './Components/redux/actionFeed'
import { confirmLogin } from './Components/redux/actionUser'
import socket from './Components/redux/socket'
class App extends Component {
  componentDidMount() {
    socket.connect()

    this.props.getTheFeed()
    this.props.checkLogin()
  }

  render() {
    return (
      <Router history={createBrowserHistory}>
        <div>
          <div className='hero is-info hero-body' id='topBack'>
            <div className='container has-text-centered'>
              <p id='title'>My day</p>
            </div>
          </div>
          <section
            className='hero is-primary is-bold subtitle'
            id='userGreeting'
          >
            <HelloUser />
          </section>
          <LoginControl />
          <Feed />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userNotExist: () => dispatch({ type: 'loggedOut', payload: 'Guest' }),
    checkLogin: () => dispatch(confirmLogin()),
    getTheFeed: () => dispatch(getPosts())
  }
}

export default connect(null, mapDispatchToProps)(App)
