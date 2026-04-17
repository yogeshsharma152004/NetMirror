import Header from "./Header";
import BackgroundImg from "../assets/background.jpg";
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
  const dispatch = useDispatch()

  const name = useRef(null)
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
          const user = userCredential.user;
          updateProfile(user ,{
            displayName: name.current.value,
           
          })
            .then(() => {
               const {uid , email , displayName }= auth.currentUser;
                         dispatch(addUser({uid:uid , email:email , displayName:displayName}));
              
            })
            .catch((error) => {
              setErrorMessage(error.message)
            });
          
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />

      <div className="absolute  brightness-40 ">
        <img src={BackgroundImg} alt="Image" />
      </div>

      <form
        className="w-[350px] absolute bg-black/80 text-white p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="font-semibold text-3xl mb-8">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2  mb-4 w-full bg-[#484646b7] rounded-sm outline-0 "
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2  mb-4 w-full bg-[#484646b7] rounded-sm outline-0"
        />

        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-2   w-full bg-[#484646b7]  rounded-sm outline-0"
        />

        <p className="text-red-400 mt-4 font-semibold text-lg">
          {errorMessage}
        </p>

        <button
          className="p-2 mt-8 w-full font-semibold bg-red-600 rounded-sm cursor-pointer"
          onClick={handleButtonClick}
        >
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
};

export default Login;
