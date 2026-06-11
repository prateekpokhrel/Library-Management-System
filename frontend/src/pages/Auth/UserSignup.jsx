import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaUserPlus,
  FaArrowLeft,
  FaGoogle,
  FaTimes,
  FaFileContract,
  FaShieldAlt
} from "react-icons/fa";
import { register } from "../../services/authService";

export default function UserSignup() {
  const navigate = useNavigate();

  // State to handle which modal is open ('none', 'terms', or 'privacy')
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: "none" });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register({
        fullName,
        email,
        phone,
        location,
        password
      });

      navigate("/user/login");

    } catch (err) {
      setError(
          err?.response?.data ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Initiating Google SSO...");
  };

  const openModal = (type) => setModalConfig({ isOpen: true, type });
  const closeModal = () => setModalConfig({ isOpen: false, type: "none" });

  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative px-4 py-12 overflow-hidden font-sans">

        {/* Structural Background Embellishments */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Navigation Return Link */}
        <Link
            to="/"
            className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group z-10"
        >
          <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        {/* Main Boxed Panel */}
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 w-full max-w-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden z-10"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"></div>

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-indigo-600">
              <FaUserPlus className="text-2xl" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-light">
              Join the digital library ecosystem to explore, borrow, and track resources.
            </p>
          </div>

          {/* Google SSO Button */}
          <button
              onClick={handleGoogleSignup}
              type="button"
              className="w-full bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 mb-6"
          >
            <FaGoogle className="text-rose-500 text-lg" />
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Or Register With Email</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors"><FaUser /></span>
                  <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 text-sm shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors"><FaPhone /></span>
                  <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 9800000000"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 text-sm shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors"><FaEnvelope /></span>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@university.edu"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 text-sm shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Location</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors"><FaMapMarkerAlt /></span>
                  <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Dharan, Nepal"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 text-sm shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors"><FaLock /></span>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 text-sm shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors"><FaLock /></span>
                  <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 text-sm shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Terms & Conditions */}
            <div className="pt-2 ml-1">
              <label className="flex items-center text-sm font-medium text-slate-600 select-none">
                <input type="checkbox" required className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition mr-2.5 cursor-pointer" />
                <span className="transition-colors">
                I accept the{" "}
                  <button type="button" onClick={() => openModal("terms")} className="text-indigo-600 font-bold hover:underline focus:outline-none">
                  Terms of Service
                </button>{" "}
                  &{" "}
                  <button type="button" onClick={() => openModal("privacy")} className="text-indigo-600 font-bold hover:underline focus:outline-none">
                  Privacy Policy
                </button>
              </span>
              </label>
            </div>

            {
                error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                      {error}
                    </div>
                )
            }

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-70"
            >
              {loading
                  ? "Creating Account..."
                  : "Create My Account"}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/user/login" className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors">
              Login here
            </Link>
          </p>

        </motion.div>

        {/* Terms & Privacy Modals */}
        <AnimatePresence>
          {modalConfig.isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                {/* Dark Blurred Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
                ></motion.div>

                {/* Modal Content Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        {modalConfig.type === "terms" ? <FaFileContract /> : <FaShieldAlt />}
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {modalConfig.type === "terms" ? "Terms of Service" : "Privacy Policy"}
                      </h2>
                    </div>
                    <button
                        onClick={closeModal}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Modal Scrollable Body */}
                  <div className="p-6 md:p-8 overflow-y-auto text-slate-600 text-sm leading-relaxed space-y-6">
                    {modalConfig.type === "terms" ? (
                        <>
                          <p>Welcome to SmartShelf AI. By accessing or using our library management platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">1. Use of the Platform</h3>
                            <p>The SmartShelf AI platform is designed to facilitate the borrowing, tracking, and management of library resources. You agree to use the platform solely for educational and administrative purposes aligned with your institution's guidelines.</p>
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">2. User Accounts & Security</h3>
                            <p>You are responsible for safeguarding your login credentials (including passwords and OTP codes). Any activity occurring under your account is your responsibility. You must immediately notify administration of any unauthorized access.</p>
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">3. Library Rules & Fines</h3>
                            <p>Borrowing limits, return deadlines, and late fee penalties are strictly enforced by the platform's automated systems based on your institution's distinct configuration. Disputes regarding fines must be directed to your local library administrator.</p>
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">4. Termination of Service</h3>
                            <p>We reserve the right to suspend or terminate your access to the platform immediately, without prior notice, if you breach these terms or engage in fraudulent borrowing activities.</p>
                          </div>
                        </>
                    ) : (
                        <>
                          <p>At SmartShelf AI, your privacy and data security are our top priorities. This Privacy Policy explains how we collect, use, and protect your personal and reading data.</p>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">1. Data Collection</h3>
                            <p>We collect essential personal information required to maintain your library account, including your Name, Email Address, Phone Number, Location, and Institutional ID. We also track your digital and physical borrowing history.</p>
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">2. AI & Machine Learning Usage</h3>
                            <p>SmartShelf AI utilizes machine learning algorithms to provide personalized book recommendations. Your borrowing history and semantic search queries are anonymized and processed by our AI engine to improve these recommendations. We do not sell this data to third-party advertisers.</p>
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">3. Data Security</h3>
                            <p>All sensitive information, including passwords and cryptographic tokens, are securely hashed. Data transmitted between your device and our cloud infrastructure is protected using enterprise-grade SSL/TLS encryption protocols.</p>
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">4. Your Rights</h3>
                            <p>You reserve the right to request a complete export of your personal data stored on the platform, or request full account deletion, subject to clearing any pending library dues or borrowed items.</p>
                          </div>
                        </>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      I Understand
                    </button>
                  </div>

                </motion.div>
              </div>
          )}
        </AnimatePresence>
      </div>
  );
}