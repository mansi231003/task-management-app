import { loginUser } from "../services/auth";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { UserLock } from "lucide-react";

export default function Login() {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginUser({
                email,
                password
            });

            login(data.token, data.user);

        } catch (error) {
            console.log(error);
            alert("Invalid credentials");
        }
    };


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">

            <div className="w-full max-w-md p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-4xl font-bold flex justify-center items-end gap-2 text-center text-slate-800 mb-6">
                    <UserLock className="w-8 h-8"/> Login
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email" placeholder="Enter email" value={email}
                                onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input className=" w-full border rounded-lg px-4 py-3 focus:outline-none
                                focus:ring-2 focus:ring-blue-500"
                                type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className=" w-full bg-blue-600 hover:bg-blue-700 text-white
                            py-3 rounded-lg font-semibold text-lg transition shadow-md" type="submit">
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?
                        <Link className="ml-2 text-blue-600 font-semibold hover:text-blue-800"
                            to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}