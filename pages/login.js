/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { app } from '../firebase-config'
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged, browserLocalPersistence  } from "firebase/auth";
import AuthContext from '../context/AuthContext';
import Link from 'next/link';

const Login = () => {
  const AuthCtx = useContext(AuthContext);
  //console.log("AuthContext", AuthCtx);
  
  const router = useRouter();

  if(AuthCtx.validUser){
    router.push('/');
    return;
  }



  const auth = getAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginFormSubmitHandler = (e)=>{

    e.preventDefault(); 
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //console.log("Users Token:", user.accessToken);
      //router.push('/');
      //AuthCtx.addUserId(user.uid);
      setPersistence(auth, browserLocalPersistence);
      router.replace('/');
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });

  }

  /*
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      //console.log("ID",uid);
      AuthCtx.addUserId(user.uid);
      
      // ...
    } else {
      // User is signed out
      // ...
      console.log("No user found!");
    }
  });
*/
 

  return (
    <>

    <h1>Login to your account</h1>
    {/* <p>User ID:{AuthCtx.userId}</p> */}
    <form onSubmit={loginFormSubmitHandler}>
          <div className="form-control"> 
            <label htmlFor="email">email</label>
            <input type="email" id="email" placeholder='Email' ref={emailRef} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' ref={passwordRef}/>
          </div>
          <div className="form-control">
            <button>Submit!</button>
          </div>
        </form>

        <div>
          <p>{`Don't have any account?`} Register <Link href="/register">Here.</Link></p>
          <p> </p>
        </div>
    </>
    
  )
}

export default Login