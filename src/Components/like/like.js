import React, { useState } from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actionLike } from '../redux/actionLike'
const LikeButton = args => {
  const props = args.props

  const [likeState, setLike] = useState(props.State)

  const likeHandler = e => {
    if (props.userId) {
      setLike(!likeState)
      setTimeout(() => {
        const isTrue = !likeState
        const likeObj = {
          likeState: isTrue,
          postId: props.postId
        }
        args.postLike(likeObj)
      }, 500)
    } else {
      console.log('yolo')
    }
  }
  const buttonDiv = () => {
    return (
      <Button
        color={props.State ? 'red' : 'grey'}
        content='Like'
        icon='heart'
        className='likeButton'
        onClick={likeHandler}
        label={{
          basic: true,
          color: props.State ? 'red' : 'grey',
          pointing: 'left',
          content: props.likeCount
        }}
      />
    )
  }
  return (
    <div>
      {props.userId ? (
        buttonDiv()
      ) : (
        <Popup content='Log in to like this post' trigger={buttonDiv()} />
      )}
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    postLike: likeObj => dispatch(actionLike(likeObj))
  }
}
export default connect(null, mapDispatchToProps)(LikeButton)
