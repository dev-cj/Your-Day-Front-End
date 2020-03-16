import axios from 'axios'
import Cookies from 'js-cookie'
import { getPosts, getRequired } from './actionFeed'
export const postComment = commentBody => dispatch => {
  const token = Cookies.get('tokenMERNlive')
  const header = {
    headers: {
      'x-auth-token': token
    }
  }
  const url = '/api/comment'
  axios
    .post(url, commentBody, header)
    .then(response => {
      dispatch(getPosts())
      getRequired()
    })
    .catch(error => console.log(error))
}
