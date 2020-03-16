import React, { Component } from 'react'
import LoginForm from '.././login/login'
import RegisterForm from '.././register/register'
import AddPost from '../addPost/addPost'
import { Switch, Route, NavLink } from 'react-router-dom'
import createBrowserHistory from '../../history'
import { connect } from 'react-redux'

class LoginControl extends Component {
  render() {
    switch (this.props.isLoggedIn) {
      case true:
        console.log('i made this far!')
        createBrowserHistory.push('/addpost')
        return (
          <div className='control'>
            <AddPost />
          </div>
        )
      default:
        return (
          <div>
            <div className='hero userDiv is-primary' id='loginControlLinks'>
              <NavLink
                to='/login'
                exact
                id='links'
                activeClassName='has-text-link '
              >
                Login
              </NavLink>
              <NavLink to='/' exact id='links' activeClassName='has-text-link'>
                Home
              </NavLink>
              <NavLink
                to='/register'
                exact
                id='links'
                activeClassName='has-text-link'
              >
                Register
              </NavLink>
            </div>
            <div className='flexRow rowToColumn'>
              <Switch>
                <Route exact path='/login' render={() => <LoginForm />} />
                <Route exact path='/register' component={RegisterForm} />
                <Route
                  exact
                  path='/'
                  render={() => {
                    return (
                      <article className='message'>
                        <div className='message-header'>
                          <p>User not logged in</p>
                        </div>
                        <div className='message-body'>
                          Please Log In to <strong>Add A New Post</strong>
                        </div>
                      </article>
                    )
                  }}
                />
              </Switch>
            </div>
          </div>
        )
    }
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(LoginControl)
