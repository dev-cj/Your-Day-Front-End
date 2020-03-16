import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      response: ''
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    let passLength = this.state.password.length;
    if (passLength < 8) {
      alert('Password should atleast 8 characters in length..');
    } else {
      axios
        .post('/api/users', {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          this.setState({ response: response.data.message });
          setTimeout(() => {
            this.props.history.push('/login');
          }, 1000);
        })
        .catch(err => this.setState({ response: err.response.data.message }));
    }
    this.setState({
      name: '',
      email: '',
      password: ''
    });
  };
  render() {
    const { name, email, password, response } = this.state;
    return (
      <div className='message is-large is-primary divHeight'>
        <form onSubmit={this.submitHandler}>
          <h1 className='userName message-header'>Register Form</h1>
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                value={name}
                name='name'
                onChange={this.changeHandler}
                placeholder='Enter Name'
                required
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control'>
              <input
                className='input'
                type='email'
                value={email}
                name='email'
                onChange={this.changeHandler}
                placeholder='Enter Email'
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
                value={password}
                name='password'
                onChange={this.changeHandler}
                placeholder='Enter Password'
                autoComplete='on'
                required
              />
            </div>
          </div>
          <div className='is-size-7 has-text-danger'>
            <strong>{response}</strong>
          </div>
          <button type='submit' className='button is-primary'>
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
