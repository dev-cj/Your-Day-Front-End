export const initialState = {
  isLoggedIn: false,
  userName: '',
  userId: '',
  updateRequired: false,
  posts: []
}

const reducer = (state = initialState, action) => {
  // console.log(state, action)
  switch (action.type) {
    case 'loggedIn': {
      return {
        ...state,
        userName: action.payload.name,
        userId: action.payload._id,
        isLoggedIn: true
      }
    }
    case 'loggedOut': {
      return {
        ...state,
        userName: action.payload,
        isLoggedIn: false
      }
    }
    case 'getFeed': {
      return {
        ...state,
        posts: action.payload
      }
    }
    default:
      return state
  }
}
export default reducer
