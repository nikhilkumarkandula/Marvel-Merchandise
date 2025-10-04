import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { KeyRound, Store, Shirt, Info, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DropDown from "../components/DropDown"

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  return (
    <header>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full sticky">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-25 h-9 flex items-center justify-center">
                <img src="/logo.png" alt="logo" className="w-full h-full" />
              </div>
              <h1 className="text-lg font-bold">Marvel Merchandise</h1>
            </Link>
          </div>

          {/* Center: Nav links (only when logged in) */}
          {authUser && (
            <div className="flex items-center gap-6">
              <Link to={"/"} className="flex gap-2 items-center cursor-pointer">
                <Store className="size-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>

              <Link to={"/collection"} className="flex gap-2 items-center cursor-pointer">
                <Shirt className="size-5" />
                <span className="hidden sm:inline">Collection</span>
              </Link>

              <Link to={"/about"} className="flex gap-2 items-center cursor-pointer">
                <Info className="size-5" />
                <span className="hidden sm:inline">About Us</span>
              </Link>
            </div>
          )}

          {/* Right: Cart, Account or Forgot Password */}
          <div className="flex items-center gap-4">
            {!authUser && (
              <button
                onClick={() => navigate("/forgot")}
                className="flex items-center gap-1 w-full text-left px-4 py-2 hover:text-amber-400 cursor-pointer"
              >
                <KeyRound className="size-5" />
                <span className="hidden sm:inline">Forgot-Password</span>
              </button>
            )}

            {authUser && (
              <>
                <Link to={"/cart"} className="flex gap-2 items-center cursor-pointer">
                  <ShoppingCart className="size-5" />
                  <span className="hidden sm:inline">Cart</span>
                </Link>
                <DropDown />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;