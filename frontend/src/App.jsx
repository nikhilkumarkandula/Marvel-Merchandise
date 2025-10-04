import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import LogoutPage from "./pages/LogoutPage"
import ForgotPage from "./pages/ForgotPage"
import CartPage from "./pages/CartPage"
import OrderPage from "./pages/OrderPage"
import CollectionPage from "./pages/CollectionPage"
import AboutPage from "./pages/AboutPage"

import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"

import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
function App() {
  const { authUser, checkAuth, isCheckingAuth, theme} = useAuthStore();

  console.log(authUser);

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if(isCheckingAuth){
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="relative">
        <div className="h-25 w-25 border-4 border-t-red-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold tracking-widest text-red-500">Marvel</span>
        </div>
      </div>
      <p className="mt-6 text-lg tracking-wider text-gray-300 animate-pulse">
        Assembling your Marvel experience...
      </p>
    </div>
    )
  }

  
  return (
    <div >
      <Navbar />

      <ScrollToTop/>
      <Routes>
        <Route path="/" element={ authUser ?<HomePage/> : <Navigate to ="/login"/>} /> 
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage/> :  <Navigate to="/" />} />
        <Route path="/logout" element={!authUser ? <LogoutPage/> : <Navigate to="/" />} />
        <Route path="/forgot" element={!authUser ? <ForgotPage/> : <Navigate to="/" />} />

        <Route path="/collection" element={authUser ? <CollectionPage/> : <Navigate to="/" />} />  
        <Route path="/collection/:ctgry" element={authUser ? <CollectionPage/> : <Navigate to="/" />} />
        <Route path="/about" element={<AboutPage/>} />
        
        <Route path="/cart" element={authUser ? <CartPage/> : <Navigate to="/" />} />
        <Route path="/orders" element={authUser ? <OrderPage/> : <Navigate to="/" />} />

      </Routes>

      <Toaster />

      <Footer/>

    </div>
  )
}

export default App
