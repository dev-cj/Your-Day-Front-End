import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import createBrowserHistory from '../../history'

class HelloUser extends Component {
  logOutHandler() {
    Cookies.remove('tokenMERNlive')
    console.log('cookies removed')
    this.props.dispatchLogOut()
    createBrowserHistory.push('/')
    window.location.reload()
  }

  render() {
    switch (this.props.helloUserName) {
      case 'Guest':
        return (
          <div className='control flex userDiv'>
            <h1 id='userName'>Hello {this.props.helloUserName}</h1>
          </div>
        )
      default:
        return (
          <div className='flex userDiv'>
            <button className='hidden'>Log Out</button>
            <h1 id='userName'>Hello {this.props.helloUserName}</h1>
            <button
              className='button is-info is-inverted is-outlined logOut'
              onClick={this.logOutHandler.bind(this)}
            >
              Log Out
            </button>
          </div>
        )
    }
  }
}
const mapStateToProps = state => {
  return {
    helloUserName: state.userName
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchLogOut: () => dispatch({ type: 'loggedOut', payload: 'Guest' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloUser)
