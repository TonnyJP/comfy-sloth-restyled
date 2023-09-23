import React, { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0()

  return (
    <UserContext.Provider value={{loginWithRedirect, logout, user}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
