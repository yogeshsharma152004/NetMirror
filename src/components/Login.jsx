import Header from "./Header"
import BackgroundImg from "../assets/background.jpg"
import { useState } from "react"
const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)

    const toggleSignInform = () => {
      setIsSignInForm(!isSignInForm)
    }

  return (
    <div>
      <Header />

      <div className="absolute">
        <img src={BackgroundImg} alt="Image" />
      </div>

      <form className="w-3/12 absolute bg-black/80 text-white p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
        <h1 className="font-semibold text-3xl mb-8">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && <input
          type="text"
          placeholder="Full Name"
          className="p-2  mb-4 w-full bg-[#484646b7] rounded-sm outline-0 "
        />}

        <input
          type="text"
          placeholder="Email Address"
          className="p-2  mb-4 w-full bg-[#484646b7] rounded-sm outline-0"
        />

        <input
          type="text"
          placeholder="Password"
          className="p-2   w-full bg-[#484646b7]  rounded-sm outline-0"
        />

        <button className="p-2 mt-8 w-full font-semibold bg-red-600 rounded-sm">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="mt-18 text-lg  text-neutral-400">
          {isSignInForm ? "New to Netflix ?" : "Alredy registerd ?"}{" "}
          <span
            onClick={toggleSignInform}
            className="font-semibold text-white cursor-pointer"
          >
            {isSignInForm ? "Sign up now" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login