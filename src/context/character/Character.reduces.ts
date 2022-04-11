import { CHARACTER_ACTION_TYPES, CharacterState } from './Character.Types';

export interface ReducerAction {
  type: CHARACTER_ACTION_TYPES;
  payload?: any;
}

const userReducer = (state: CharacterState, action: ReducerAction) => {
  switch (action.type) {
    case CHARACTER_ACTION_TYPES.FETCH_CHARACTERS:
      return {
        ...state,
        loading: false,
        characters: action.payload,
      };
    case CHARACTER_ACTION_TYPES.FETCH_CHARACTER:
      return {
        ...state,
        loading: false,
        character: action.payload,
      };
    case CHARACTER_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
