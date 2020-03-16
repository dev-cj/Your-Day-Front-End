import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
//import axios from 'axios';
import { connect } from 'react-redux'
import { deletePost, updatePost } from '../../Components/redux/actionFeed'
import CommentComp from '../Comment/comment'
import NewComment from '../Comment/newComment'
import LikeButton from '../like/like'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      open: false,
      editId: ''
    }
  }
  closeModal = () => {
    this.setState({ open: false })
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    const postBody = {
      title: this.state.title,
      body: this.state.body
    }
    //console.log(this.state.editId)
    this.props.updateThePost(this.state.editId, postBody)
    this.setState({
      body: '',
      open: false,
      editId: ''
    })
  }
  deletePostHandler = id => {
    //console.log(id)
    this.props.delPost(id)
  }

  render() {
    let { body } = this.state
    //console.log(this.props.posts)
    const posts = this.props.posts
    this.card = posts.map(posts => (
      <div key={posts._id} className=' card message is-success'>
        <div className=' notification is-primary card-header feed'>
          <h1>Feed</h1>
          {posts.authorId === this.props.userId ? (
            <div key={posts._id}>
              <button
                type='edit'
                className='button is-primary deleteFeed'
                onClick={() =>
                  this.setState({ open: !this.state.open, editId: posts._id })
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z' />
                </svg>
              </button>
              <button
                type='delete'
                className='button is-primary deleteFeed'
                onClick={() => this.deletePostHandler(posts._id)}
              >
                <svg
                  width='24'
                  height='24'
                  xmlns='http://www.w3.org/2000/svg'
                  fillRule='evenodd'
                  clipRule='evenodd'
                >
                  <path d='M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z' />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
        <header className='card-header'>
          <p className='card-header-title' key={posts._id}>
            {posts.authorName}'s day
          </p>
        </header>
        <div className='card-content'>
          <div className='content'>
            <p className='card-text' key={posts._id}>
              {posts.body}
            </p>
            <br />
          </div>
        </div>
        <LikeButton
          props={{
            likeCount: posts.likes.count,
            State: posts.likes.likedBy.some(
              item => item.likedById === this.props.userId
            ),
            postId: posts._id,
            userId: this.props.userId
          }}
        />
        <CommentComp comments={posts.comments} />
        {this.props.userId ? <NewComment postId={posts._id} /> : null}
      </div>
    ))
    return (
      <div className='feedFlex'>
        <Modal
          id='myModal'
          onClose={this.closeModal}
          size={'small'}
          open={this.state.open}
          closeIcon
        >
          <Header icon='archive' content='Edit this post' />
          <form onSubmit={this.submitHandler}>
            <Modal.Content>
              <section className='modal-card-body'>
                <label htmlFor='body' className='label userName'>
                  Body
                </label>
                <div className='field-body'>
                  <div className='field'>
                    <div className='control'>
                      <textarea
                        className='textarea'
                        value={body}
                        name='body'
                        onChange={this.changeHandler}
                        placeholder='Type here'
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>
            </Modal.Content>
            <Modal.Actions id='actions'>
              <Button color='red' onClick={this.closeModal} id='actionIcon'>
                <Icon name='remove' /> Cancel
              </Button>
              <Button type='submit' color='green' id='actionIcon'>
                <Icon name='checkmark' /> Update
              </Button>
            </Modal.Actions>
          </form>
        </Modal>
        {this.card}
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    delPost: postId => dispatch(deletePost(postId)),
    updateThePost: (postId, postBody) => dispatch(updatePost(postId, postBody))
  }
}
const mapTheStateToProps = state => {
  return {
    userId: state.userId,
    posts: state.posts
  }
}
export default connect(mapTheStateToProps, mapDispatchToProps)(Feed)
