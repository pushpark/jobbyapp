import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isValid: true, error: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const details = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.successLogin(data.jwt_token)
    } else {
      this.setState({isValid: false, error: data.error_msg})
    }
  }

  render() {
    const {username, password, isValid, error} = this.state
    const errorMessage = isValid ? 'hide-error1' : 'show-error-message'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container1">
        <div className="login-card1">
          <img
            className="logo-image1"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <form
            className="login-form1"
            type="submit"
            onSubmit={this.onClickSubmit}
          >
            <label className="label1" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input1"
              id="username"
              placeholder="Username"
              onChange={this.onChangeUsername}
              value={username}
            />

            <label className="label1" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input1"
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-button1">
              Login
            </button>
            <p className={errorMessage}>{`*${error}`}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
