import { USER_ACTION_TYPES, UserState } from './User.Types';

export interface ReducerAction {
  type: USER_ACTION_TYPES;
  payload?: any;
}

const userReducer = (state: UserState, action: ReducerAction) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case USER_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
