import axios from 'axios'
import Cookies from 'js-cookie'
import { getPosts, getRequired } from './actionFeed'
export const actionLike = likeObj => dispatch => {
  const token = Cookies.get('tokenMERNlive')

  const header = {
    headers: { 'x-auth-token': token, action: 'like' }
  }
  // console.log(likeObj, 'addPost', header)
  const url = '/api/posts'
  axios
    .post(url, likeObj, header)
    .then(response => {
      dispatch(getPosts())
      getRequired()
    })
    .catch(err => console.log(err))
}
