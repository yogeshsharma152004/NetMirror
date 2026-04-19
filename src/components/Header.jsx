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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".avatar-dropdown")) {
        setShowDropdown(false);
      }
      if (!e.target.closest(".mobile-menu")) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="fixed top-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between"
      style={{
        background: "rgba(7,5,15,0.35)",
        backdropFilter: "blur(5px)",
        borderBottom: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 sm:gap-3 cursor-pointer"
        onClick={() => navigate("/browse")}
      >
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-black"
          style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
        >
          ▶
        </div>
        <div className="text-lg sm:text-xl font-black tracking-widest">
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
        <>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
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
                color: "#c084fc",
              }}
            >
              {showGptSearch ? "← Home" : "✦ GPT Search"}
            </button>

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

            {/* Avatar + Dropdown */}
            <div className="relative avatar-dropdown">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#fbbf24)",
                }}
              >
                {user?.displayName?.[0]?.toUpperCase() || "U"}
              </div>

              {showDropdown && (
                <div
                  className="absolute right-0 top-12 w-60 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: "rgba(13,10,26,0.97)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(168,85,247,0.2)",
                  }}
                >
                  <div
                    className="h-px w-full"
                    style={{
                      background:
                        "linear-gradient(to right,transparent,rgba(168,85,247,0.6),transparent)",
                    }}
                  />
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

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-2 mobile-menu">
            {/* Avatar */}
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="avatar-dropdown w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white cursor-pointer"
              style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
            >
              {user?.displayName?.[0]?.toUpperCase() || "U"}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            >
              <span
                className="w-5 h-0.5 rounded"
                style={{ background: "#c084fc" }}
              />
              <span
                className="w-5 h-0.5 rounded"
                style={{ background: "#c084fc" }}
              />
              <span
                className="w-3.5 h-0.5 rounded"
                style={{ background: "#c084fc" }}
              />
            </button>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
              <div
                className="absolute right-4 top-14 w-64 rounded-2xl overflow-hidden z-50"
                style={{
                  background: "rgba(13,10,26,0.97)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(to right,transparent,rgba(168,85,247,0.6),transparent)",
                  }}
                />
                <div className="p-3 flex flex-col gap-2">
                  {showGptSearch && (
                    <select
                      onChange={(e) => dispatch(changeLanguage(e.target.value))}
                      className="w-full text-sm font-semibold px-3 py-2 rounded-xl outline-none cursor-pointer"
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

                  <button
                    onClick={() => {
                      dispatch(toggleGptSearchView());
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer text-left"
                    style={{
                      background: showGptSearch
                        ? "rgba(168,85,247,0.1)"
                        : "linear-gradient(135deg,rgba(168,85,247,0.3),rgba(251,191,36,0.2))",
                      border: "1px solid rgba(168,85,247,0.4)",
                      color: "#c084fc",
                    }}
                  >
                    {showGptSearch ? "← Home" : "✦ GPT Search"}
                  </button>

                  <button
                    onClick={() => {
                      navigate("/watchlist");
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2.5 flex items-center gap-2 rounded-xl text-sm font-semibold cursor-pointer"
                    style={{
                      background: "rgba(168,85,247,0.1)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      color: "#c084fc",
                    }}
                  >
                    <IoIosAdd className="text-xl" /> Watchlist
                  </button>

                  <div
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    className="pt-2"
                  >
                    <div className="px-2 pb-2 flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
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
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
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
              </div>
            )}

            {/* Avatar dropdown (mobile) */}
            {showDropdown && (
              <div
                className="avatar-dropdown absolute right-4 top-14 w-60 rounded-2xl overflow-hidden z-50"
                style={{
                  background: "rgba(13,10,26,0.97)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(to right,transparent,rgba(168,85,247,0.6),transparent)",
                  }}
                />
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
        </>
      )}
    </div>
  );
};

export default Header;
