import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { app } from '../firebase-config'
import { getAuth, onAuthStateChanged  } from "firebase/auth";


const Verify = () => {

  const AuthCtx = useContext(AuthContext);
  const uid = AuthCtx.userId;
  const auth = getAuth();



  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("ID",uid);
      AuthCtx.addUserId(user.uid);
      
      // ...
    } else {
      // User is signed out
      // ...
      console.log("No user found!");
    }
  });


  const verifyHandler = () =>{

  }

  return (
    <>
      <h1>Verify Token Page</h1>
      <p>User ID: {uid}</p>
      <p></p>
      <button onClick={verifyHandler}>Verify Now</button>


    </>
  )
}

export default Verify