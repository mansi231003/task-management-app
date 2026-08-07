import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"


export default function PublicRoute({ children }) {

    const { token } = useContext(AuthContext)


    if (token) {
        return <Navigate to="/dashboard" replace />
    }


    return children
}