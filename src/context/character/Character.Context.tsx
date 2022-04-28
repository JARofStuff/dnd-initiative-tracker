import { createContext, useReducer, Dispatch, FC } from 'react';
import characterReducer from './Character.reducer';
import { CharacterState, ReducerAction } from './Character.Types';

interface CharacterContextProps {
  readonly state: CharacterState;
  readonly dispatch: Dispatch<ReducerAction>;
}

const CharacterContext = createContext<CharacterContextProps>({} as CharacterContextProps);

export const initialState: CharacterState = {
  characters: null,
  character: null,
  loading: false,
};

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharacterContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
