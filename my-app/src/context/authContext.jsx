import { createContext, useState } from "react"

export const AuthContext = createContext()


export default function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    )
  const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const login = (token,userData) => {
        localStorage.setItem("token", token)
           localStorage.setItem("user", JSON.stringify(userData))
        setToken(token)
           setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("token")
      localStorage.removeItem("user")

        setToken(null)
        setUser(null)
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}