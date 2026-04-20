import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((e) => setErrorMessage(e.message));
        })
        .catch((e) => setErrorMessage(e.code + " - " + e.message));
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      ).catch((e) => setErrorMessage(e.code + " - " + e.message));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/browse");
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center px-4"
      style={{ background: "#07050f" }}
    >
      

      <div
        className="orb"
        style={{
          width: "clamp(250px,40vw,500px)",
          height: "clamp(250px,40vw,500px)",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.2),transparent 70%)",
          top: "-100px",
          left: "-100px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "clamp(200px,35vw,400px)",
          height: "clamp(200px,35vw,400px)",
          background:
            "radial-gradient(circle,rgba(255,200,50,0.1),transparent 70%)",
          bottom: "-80px",
          right: "-80px",
        }}
      />

      {/* Mini Header */}

      <div
        className="fixed top-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between"
        style={{
          background: "rgba(7,5,15,0.55)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(168,85,247,0.15)",
        }}
      >
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => navigate("/")}
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
      </div>

      {/* Form */}
      
      <div
        className="relative z-10 w-full max-w-sm sm:max-w-md p-6 sm:p-10 rounded-2xl text-white mt-16"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(168,85,247,0.6),transparent)",
          }}
        />

        <h1 className="text-2xl sm:text-3xl font-black mb-2">
          {isSignInForm ? "Welcome back" : "Join us"}
        </h1>
        <p
          className="text-xs sm:text-sm mb-6 sm:mb-8"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {isSignInForm
            ? "Sign in to continue watching"
            : "Create your account"}
        </p>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 sm:mb-4 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="w-full mb-3 sm:mb-4 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        {errorMessage && (
          <p
            className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold"
            style={{ color: "#f87171" }}
          >
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleButtonClick}
          className="w-full mt-5 sm:mt-6 py-3 rounded-xl font-black text-sm text-white cursor-pointer"
          style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="mt-5 sm:mt-6 text-xs sm:text-sm text-center"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {isSignInForm ? "New here? " : "Already registered? "}
          <span
            onClick={() => setIsSignInForm(!isSignInForm)}
            className="font-bold cursor-pointer"
            style={{ color: "#c084fc" }}
          >
            {isSignInForm ? "Create account" : "Sign in"}
          </span>
        </p>

        <p className="mt-3 text-sm text-center">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            ← Back to Home
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
