/* eslint-disable react-hooks/rules-of-hooks */
import React, {useContext} from 'react'
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { app } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged, browserLocalPersistence } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 

import { db } from '../firebase-config';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';
import classes from './register.module.css'

const register = () => {
  const router = useRouter();

  const auth = getAuth();
  const AuthCtx = useContext(AuthContext);

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  if(AuthCtx.validUser){
    router.push('/');
    return;
  } 

  const registerFormSubmitHandler = (e)=>{

    e.preventDefault(); 
    const firstName = fNameRef.current.value;
    const lastName = lNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const newUserId = user.uid;
      //Create new database entry to users with created user id
      try {
        const docRef = await addDoc(collection(db, "users"), {
          first: firstName,
          last: lastName,
          email:email,
          uid: user.uid
        });
        //console.log("returend: ", docRef);
        console.log("Document written with ID: ", docRef.id);
        router.replace('/');
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });

  }


  return (
    <>

    <h1>Register for the app</h1>
    <form onSubmit={registerFormSubmitHandler}>
          <div className="form-control"> 
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" placeholder='First Name' ref={fNameRef} />
          </div>
          <div className="form-control"> 
            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" placeholder='Last Name' ref={lNameRef} />
          </div>
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

        <p> Already registered ? :)  <Link className= {classes.link_text} href="/login">Login here</Link> . </p>
    </>
    
  )
}

export default register