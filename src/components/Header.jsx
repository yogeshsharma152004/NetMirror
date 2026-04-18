import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/slices/userSlice";
import { toggleGptSearchView } from "../redux/slices/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constansts";
import { changeLanguage } from "../redux/slices/configSlice";
import { IoIosAdd } from "react-icons/io";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Bahar click karne pe dropdown band
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".avatar-dropdown")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="fixed top-0 w-full z-50 px-8 py-4 flex items-center justify-between"
      style={{
        background: "rgba(7,5,15,0.55)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/browse")}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
          style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
        >
          ▶
        </div>
        <div className="text-xl font-black tracking-widest">
          <span className="text-white">NET</span>
          <span
            style={{
              background: "linear-gradient(135deg,#a855f7,#fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MIRROR
          </span>
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          {showGptSearch && (
            <select
              onChange={(e) => dispatch(changeLanguage(e.target.value))}
              className="text-sm font-semibold px-4 py-2 rounded-xl outline-none cursor-pointer"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.25)",
                color: "#c084fc",
              }}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  style={{ background: "#07050f", color: "#fff" }}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* GPT Search Toggle */}
          <button
            onClick={() => dispatch(toggleGptSearchView())}
            className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
            style={{
              background: showGptSearch
                ? "rgba(168,85,247,0.1)"
                : "linear-gradient(135deg,rgba(168,85,247,0.3),rgba(251,191,36,0.2))",
              border: showGptSearch
                ? "1px solid rgba(168,85,247,0.3)"
                : "1px solid rgba(168,85,247,0.4)",
              color: showGptSearch ? "#c084fc" : "#c084fc",
            }}
          >
            {showGptSearch ? "← Home" : "✦ GPT Search"}
          </button>

          {/* Watchlist Button */}
          <button
            onClick={() => navigate("/watchlist")}
            className="px-4 py-2 flex items-center gap-1 rounded-xl text-sm font-semibold cursor-pointer"
            style={{
              background: "rgba(168,85,247,0.1)",
              border: "1px solid rgba(168,85,247,0.3)",
              color: "#c084fc",
            }}
          >
            <IoIosAdd className="text-xl" /> Watchlist
          </button>

          {/* ✅ Avatar + Dropdown */}
          <div className="relative avatar-dropdown">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white cursor-pointer"
              style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
            >
              {user?.displayName?.[0]?.toUpperCase() || "U"}
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="absolute right-0 top-12 w-60 rounded-2xl overflow-hidden z-50"
                style={{
                  background: "rgba(13,10,26,0.97)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                {/* Top shimmer line */}
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(to right,transparent,rgba(168,85,247,0.6),transparent)",
                  }}
                />

                {/* User Info */}
                <div
                  className="px-4 py-4 flex items-center gap-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#7c3aed,#fbbf24)",
                    }}
                  >
                    {user?.displayName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Sign Out */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleSignOut();
                    }}
                    className="w-full px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer text-left flex items-center gap-3"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      color: "#f87171",
                    }}
                  >
                    ↩ Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
