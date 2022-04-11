import { createContext, useReducer, Dispatch, FC } from 'react';
import { UserState } from './User.Types';
import userReducer, { ReducerAction } from './User.Reducer';

type UserContextType = {
  readonly state: UserState;
  readonly dispatch: Dispatch<ReducerAction>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

const initialState: UserState = {
  users: null,
  currentUser: null,
  loading: false,
};

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
