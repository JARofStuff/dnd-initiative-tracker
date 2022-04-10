import { USER_ACTION_TYPES, initialState, ReducerAction } from './User.Types'

const userReducer = (state = initialState, action: ReducerAction) => {
  console.log(USER_ACTION_TYPES.SET_CURRENT_USER)
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
      }
    case USER_ACTION_TYPES.SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

export default userReducer
