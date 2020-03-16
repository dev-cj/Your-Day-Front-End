import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postComment } from '../redux/postComment'
const NewComment = props => {
  const [commentBody, setComment] = useState('')
  const handleChange = e => {
    setComment(e.target.value)
  }
  const submitHandler = e => {
    e.preventDefault()
    const commentObj = {
      comment: commentBody,
      postId: props.postId
    }
    props.addComment(commentObj)
    setComment('')
  }
  return (
    <Form onSubmit={submitHandler} reply>
      <Form.TextArea
        placeholder='Reply'
        name='comment'
        value={commentBody}
        onChange={handleChange}
      />
      <Button
        content='Add Reply'
        labelPosition='left'
        icon='edit'
        id='replyButton'
        primary
      />
    </Form>
  )
}
const marDispatchToProps = dispatch => {
  return {
    addComment: commentBody => dispatch(postComment(commentBody))
  }
}
export default connect(null, marDispatchToProps)(NewComment)
