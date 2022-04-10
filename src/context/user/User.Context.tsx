import { createContext, useReducer, FC } from 'react'
import { initialState } from './User.Types'

import userReducer from './User.Reducer'

const UserContext = createContext(initialState)

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
