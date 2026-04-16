import React, { useEffect } from 'react'
import NetmirrorImg from '../assets/NetMirror.png'
import userIcon from "../assets/user-logo.jpg"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../redux/slices/userSlice'
const Header = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user )
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
       
      })
      .catch((error) => {
        navigate("/error")
      });
  }

    useEffect(() => {
     const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName } = user;
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName }),
          );

          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });

      return () => unsubscribe()
    }, []);

  return (
    <div className="absolute top-0 w-full px-8 py-2  z-10 flex items-center justify-between  ">
      <img className="w-44" src={NetmirrorImg} alt="logo" />

      {user && (
        <div className="flex items-center gap-6">
          <img className="w-10" src={userIcon} alt="userIcon" />

          <button
            onClick={handleSignOut}
            className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold text-lg cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header