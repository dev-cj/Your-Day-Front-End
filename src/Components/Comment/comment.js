import React from 'react'
import { Comment, Header } from 'semantic-ui-react'
import moment from 'moment'
const CommentComp = props => {
  let comments = props.comments.map(comment => (
    <Comment key={comment._id}>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='small'>{comment.authorName}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(comment.createdAt).fromNow()}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
      </Comment.Content>
    </Comment>
  ))
  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {comments}
    </Comment.Group>
  )
}

export default CommentComp
