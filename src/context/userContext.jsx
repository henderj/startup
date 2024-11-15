import React from 'react'
import { createContext, useState } from 'react'

export const UserContext = createContext(null)

/*
  user = {
    username: string
    token: string
  }
*/

export default function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}


