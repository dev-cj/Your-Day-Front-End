import axios from 'axios'
import Cookies from 'js-cookie'

let token = Cookies.get('tokenMERNlive')
export const confirmLogin = login => dispatch => {
  const url = 'api/auth/user'
  // console.log(token, 'tokens', login)
  const header = {
    headers: { 'x-auth-token': token === undefined ? login : token }
  }
  if (login || token) {
    axios.post(url, {}, header).then(response =>
      dispatch({
        type: 'loggedIn',
        payload: response.data
      })
    )
  } else {
    dispatch({
      type: 'loggedOut',
      payload: 'Guest'
    })
  }
}
