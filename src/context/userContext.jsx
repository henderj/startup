import React, { useEffect } from 'react'
import { createContext, useState } from 'react'

export const UserContext = createContext(null)

/*
  user = {
    username: string
  }
*/

export default function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/me', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      if (response.status == 200) {
        const body = await response.json()
        setCurrentUser({ username: body.username })
      }
    }
    fetchUser().catch(console.error)
  }, [])
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


