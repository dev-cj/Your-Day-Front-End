import axios from 'axios'
import Cookies from 'js-cookie'
import socket from './socket'
import store from './store'
export const getRequired = () => {
  socket.emit('Update users', {}, ({ Update }) => {
    console.log(Update)
  })
}
socket.on('Update Now', data => {
  console.log(data)
  if (data) store.dispatch(getPosts())
})
export const updatePost = (postId, postBody) => dispatch => {
  const token = Cookies.get('tokenMERNlive')
  const header = {
    headers: { 'x-auth-token': token }
  }
  const url = `/api/posts/${postId}`
  axios
    .put(url, postBody, header)
    .then(response => {
      dispatch(getPosts())
      getRequired()
    })
    .catch(err => console.log(err))
}
export const getPosts = () => dispatch => {
  //console.log("sup")

  const url = '/api/posts'
  axios
    .get(url)
    .then(response => {
      dispatch({
        type: 'getFeed',
        payload: response.data
      })
    })
    .catch(err => console.log(err))
}

export const deletePost = postId => dispatch => {
  const token = Cookies.get('tokenMERNlive')
  const header = {
    headers: { 'x-auth-token': token }
  }
  //console.log("delPost", postId, token)
  const url = `/api/posts/${postId}`
  axios
    .delete(url, header)
    .then(response => {
      dispatch(getPosts())
      getRequired()
    })
    .catch(err => console.log(err))
}

export const addPost = postBody => dispatch => {
  const token = Cookies.get('tokenMERNlive')
  const header = {
    headers: { 'x-auth-token': token, action: 'post' }
  }
  //console.log(postBody, "addPost", header)
  const url = '/api/posts'
  axios
    .post(url, postBody, header)
    .then(response => {
      dispatch(getPosts())
      getRequired()
    })
    .catch(err => console.log(err))
}
