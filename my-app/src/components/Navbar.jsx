import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {ListTodo,FileCheck} from "lucide-react"

export default function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 shadow-lg">

            <div className="max-w-7xl mx-auto p-3 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Logo */}
                <h2 className="text-white text-3xl font-bold cursor-pointer flex justify-center items-center gap-1"
                    onClick={() => navigate("/dashboard")}>
                        <FileCheck className="w-7 h-7 text-white" /> Task Manager
                    </h2>
                {user && (
                    <div className="flex items-center gap-14">
                        {/* User */}
                        <div className="text-white">
                            <p className="text-lg text-gray-300">Welcome</p>
                            <p className="font-semibold text-xl">{user.name}</p>
                        </div>
                        {/* Logout */}
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 flex justify-center items-center
                                text-white text-lg px-5 py-2 rounded-lg font-medium transition shadow-md">
                            Logout
                        </button>
                    </div>
                )}

            </div>

        </nav>
    );
}