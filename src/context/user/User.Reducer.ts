import { USER_ACTION_TYPES, initialState, ReducerAction } from './User.Types'

const userReducer = (state = initialState, action: ReducerAction) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENTUSER:
      return {
        ...state,
        currentUser: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
