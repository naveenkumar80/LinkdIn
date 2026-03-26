import React from 'react'
export const authDataContext = React.createContext()
export default function AuthContext({children}) {
    const serverUrl = "http://localhost:8000"
    const value = {
        serverUrl
    }
  return ( 
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
  )
}
