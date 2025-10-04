import { useState } from 'react'
import { useAuthStore } from "../store/useAuthStore"
import {ShieldCheck, User, Mail, Lock, Eye, EyeOff, Loader2  } from 'lucide-react';
import { Link } from 'react-router-dom';

import toast from 'react-hot-toast';

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // will used afterwards

const SignupPage = () => {

  const [showPassword,setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });
  const [confirmPassword, setCofirmPassword] = useState();

  const { signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(formData.password !== confirmPassword) {
      toast.error("Passwords must match")
      return
    }
    const success = validateForm();

    if(success) signup(formData);
  }
  return (
    <div className="h-screen flex justify-center items-center mt-8 bg-gray-100 py-10">
      {/* Signup Card */}
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="size-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-gray-500">Get started with your free account</p>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-4 text-gray-500 size-5" />
              <input
                type="text"
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                aria-describedby='uidnote'

              />
            </div>
          </div>

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
          {/* confirm password */}
          <div>
            <label className="text-gray-700 font-medium">Confirm Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-gray-500 size-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setCofirmPassword(e.target.value)}
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
          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin inline-block mr-2" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;