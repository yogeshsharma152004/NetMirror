import Header from "./Header";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
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

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{ background: "#07050f" }}
    >
      {/* Orbs */}
      <div
        className="orb"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.2),transparent 70%)",
          top: "-100px",
          left: "-100px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle,rgba(255,200,50,0.1),transparent 70%)",
          bottom: "-80px",
          right: "-80px",
        }}
      />

      <Header />

      {/* Form */}
      <div
        className="relative z-10 w-96 p-10 rounded-2xl text-white"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Top shimmer */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(168,85,247,0.6),transparent)",
          }}
        />

        <h1 className="text-3xl font-black mb-2">
          {isSignInForm ? "Welcome back" : "Join us"}
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
          {isSignInForm
            ? "Sign in to continue watching"
            : "Create your account"}
        </p>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
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
          className="w-full mb-4 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none"
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
            className="mt-4 text-sm font-semibold"
            style={{ color: "#f87171" }}
          >
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleButtonClick}
          className="w-full mt-6 py-3 rounded-xl font-black text-sm text-white cursor-pointer"
          style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="mt-6 text-sm text-center"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {isSignInForm ? "New here?" : "Already registered?"}{" "}
          <span
            onClick={() => setIsSignInForm(!isSignInForm)}
            className="font-bold cursor-pointer"
            style={{ color: "#c084fc" }}
          >
            {isSignInForm ? "Create account" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
