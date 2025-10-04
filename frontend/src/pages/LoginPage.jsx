import { useState} from 'react'
import { useAuthStore } from "../store/useAuthStore"
import {ShieldCheck, Mail, Lock, Eye, EyeOff, Loader2  } from 'lucide-react';
import { Link } from 'react-router-dom';
import {toast} from "react-hot-toast"

const LoginPage = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
      email:"",
      password:"",
    });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) =>{
    e.preventDefault();

    if (!formData.email?.trim()) return toast.error("Email is required");
    if (!formData.password?.trim()) return toast.error("Password is required");

    login(formData);
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 py-16">
      {/* Signup Card */}
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="size-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back </h1>
            <p className="text-gray-500">Suit Up with the Power of Marvel!</p>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-gray-500 size-5" />
              <input
                type="email"
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-gray-500 size-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin inline-block mr-2" />
                 Loading...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage