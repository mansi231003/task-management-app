import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"


export default function ProtectedRoute({ children }) {
const { token } = useContext(AuthContext)

    // const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/" replace />
    }

    return children
}