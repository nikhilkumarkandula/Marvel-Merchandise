import { useState, useRef, useEffect } from "react";
import { CircleUser, ShoppingBag, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore"

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { logout } = useAuthStore();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative ml-6" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
        onClick={() => setOpen(!open)}
      >
        <CircleUser className="size-5" />
        <span className="hidden sm:inline">Account</span>
        <ChevronDown className="size-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-10">
          <button
            onClick={() => {
              navigate("/orders");
              setOpen(false);
            }}
            className="flex items-center gap-1 w-full text-left px-4 py-2 hover:bg-teal-200 cursor-pointer"
          >
            <ShoppingBag className="size-5" />
            <span className="hidden sm:inline">Orders</span>
          </button>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="flex items-center gap-1 w-full text-left px-4 py-2 hover:bg-rose-400 cursor-pointer"
          >
            <LogOut className="size-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
