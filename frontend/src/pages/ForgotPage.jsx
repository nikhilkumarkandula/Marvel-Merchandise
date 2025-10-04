import { useState } from "react";
import { Mail, KeyRound, Lock , CircleArrowLeft} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const { forgotPassword, verifyOtp } = useAuthStore();

  const sendOtp = async () => {
    forgotPassword({email});
    setStep(2);
  };

  const resetPassword = async () => {
    const success = verifyOtp({email, newPassword, otp: otp.trim()});

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md transition-all duration-500">
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>

        {/* Email Input */}
        <div className="flex items-center border rounded px-3 py-2 mb-4 shadow-sm">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {step === 1 && (
          <>
            <button
              onClick={sendOtp}
              className="w-full bg-black text-white py-2 rounded hover:bg-green-800 transition-colors cursor-pointer"
            >
              Send OTP
            </button>

            <Link to={"/login"} className="flex gap-2 items-center cursor-pointer">
              <CircleArrowLeft className="size-5 center"/>
              <span className="hidden sm:inline">Back</span>
            </Link>
          </>
        )}

        {/* OTP & Password fields (slide-in animation) */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            step === 2 ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex items-center border rounded px-3 py-2 mb-4 shadow-sm">
            <KeyRound className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Enter OTP"
              className="w-full outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2 mb-4 shadow-sm">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            onClick={resetPassword}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Reset Password
          </button>
          
          <Link to={"/forgot"}
            onClick={() => setStep(1)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <CircleArrowLeft className="size-5"/>
            <span className="hidden sm:inline">Back</span>
          </Link>

        </div>

        
      </div>
    </div>
  );
};

export default ForgotPassword;
