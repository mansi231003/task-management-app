import { useState, useContext } from "react";
import { registerUser, loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { UserPlus } from "lucide-react";

export default function Register() {

    const { login } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            await registerUser({
                name,
                email,
                password
            });

            const { data } = await loginUser({
                email,
                password
            });

            login(data.token, data.user);

            navigate("/dashboard");

        } catch (error) {
               console.log(error.response?.data);
           setError(error.response?.data?.message || "Registration failed");
            
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <div className="w-full max-w-md p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-4xl font-bold flex justify-center gap-2 items-center text-center text-slate-800 mb-6">
                        <UserPlus className="w-7 h-7"/> Register
                    </h1>
  
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input className="w-full border rounded-lg px-4 py-3"
                                type="text" placeholder="Enter name" value={name}
                                onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input className="w-full border rounded-lg px-4 py-3"
                                type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input className="w-full border rounded-lg px-4 py-3"
                                type="password" placeholder="Enter password" value={password}
                                onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                                         {error && (
    <p className="text-red-600 text-center bg-red-50 p-3 rounded-lg">
        {error}
    </p>
)}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white
                            py-3 rounded-lg font-semibold text-lg transition shadow-md"
                            type="submit">
                            Create Account
                        </button>
                    </form>
                    <p className="text-center mt-6 text-gray-600">
                        Already have an account?
                        <Link to="/" className="ml-2 text-blue-600 font-semibold hover:text-blue-800">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}