import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { confirmLogin } from '../redux/actionUser'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputEmail: '',
      inputPassword: '',
      loading: '',
      response: ''
    }
  }

  changeHandler = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    this.setState({ loading: 'Logging in....' })
    const url = '/api/auth'
    axios
      .post(url, {
        email: this.state.inputEmail,
        password: this.state.inputPassword
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({ loading: '' })
          this.props.loginInSuccess(response.data.token)
          Cookies.set('tokenMERNlive', response.data.token)
        }
      })
      .catch(err =>
        this.setState({
          response: err.response.data.message,
          inputEmail: '',
          inputPassword: '',
          loading: ''
        })
      )
  }

  render() {
    const { inputEmail, inputPassword, response, loading } = this.state
    return (
      <div className='message is-large is-primary divHeight'>
        <form onSubmit={this.submitHandler}>
          <h1 className='userName message-header'>Login Form</h1>
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control'>
              <input
                className='input'
                type='email'
                value={inputEmail}
                name='inputEmail'
                onChange={this.changeHandler}
                placeholder='e.g Alex Smith'
                required
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input
                className='input'
                type='password'
                value={inputPassword}
                name='inputPassword'
                onChange={this.changeHandler}
                placeholder='e.g. alexsmith@gmail.com'
                autoComplete='on'
                required
              />
            </div>
          </div>
          <div className='is-size-7 has-text-danger'>
            <strong>
              {loading}
              {response}
            </strong>
          </div>
          <button type='submit' className='button is-primary'>
            Login
          </button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loginInSuccess: login => dispatch(confirmLogin(login))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
