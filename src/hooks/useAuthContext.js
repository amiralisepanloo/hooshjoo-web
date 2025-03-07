import { createContext, useReducer, useEffect, useContext } from 'react'

// create a context for authentication data
export const AuthContext = createContext()

// auth reducer function to handle state changes
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}

// custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }
  return context
}

// provider component to wrap the app and make auth context available
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  // check if user is logged in when the component mounts
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      dispatch({ type: 'AUTH_IS_READY', payload: JSON.parse(user) })
    } else {
      dispatch({ type: 'AUTH_IS_READY', payload: null })
    }
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

