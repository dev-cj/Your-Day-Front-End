import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../redux/actionFeed'

const AddPost = props => {
  const [body, setBody] = useState('')

  const bodyChangeHandler = e => {
    setBody(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    const postBody = {
      body: body,
      authorId: props.authorId
    }
    props.addThePost(postBody)
    setBody('')
  }

  return (
    <div className='message is-primary addPost'>
      <form onSubmit={submitHandler}>
        <label htmlFor='body' className='label userName'>
          How's your day going?
        </label>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                value={body}
                name='body'
                onChange={bodyChangeHandler}
                placeholder='Type here'
                required
              />
            </div>
          </div>
        </div>
        <button type='submit' className='button is-primary' id='postBtn'>
          Post it!
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authorId: state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addThePost: postBody => dispatch(addPost(postBody))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)

// <div className='message is-primary addPost'>
//       <form onSubmit={submitHandler}>
//         <label htmlFor='title' className='label userName'>
//           Title
//         </label>
//         <input
//           type='text'
//           value={title}
//           name='title'
//           placeholder='Add title here'
//           onChange={titleChangeHandler}
//           className='input'
//           required
//         />
//         <label htmlFor='body' className='label userName'>
//           Body
//         </label>
//         <div className='field-body'>
//           <div className='field'>
//             <div className='control'>
//               <textarea
//                 className='textarea'
//                 value={body}
//                 name='body'
//                 onChange={bodyChangeHandler}
//                 placeholder='Type here'
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <button type='submit' className='button is-primary' id='postBtn'>
//           Post Tweeet
//         </button>
//       </form>
//     </div>
