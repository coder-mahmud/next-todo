import classes from './Navigation.module.scss'
import Link from 'next/link'
import React,{ useContext } from 'react'
import AuthContext from '../context/AuthContext';
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useRouter } from 'next/router';



const Navigation = (props) => {
  const AuthCtx = useContext(AuthContext);
  const auth = getAuth();
  const router = useRouter();

  
  const signOutHandler = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      AuthCtx.addValidUser(false);
      router.replace('/');
    }).catch((error) => {
      // An error happened.
    });
  }

  const linkClickHandler = () => {
    props.linkClickHandler();
  }

  let menu_classes = `${classes.menu} ${props.menuOpen ? classes.menu_open : ''}`



  return (

    <nav>
    <ul className={menu_classes}>
      <li onClick={linkClickHandler}>
        <Link href="/">Home</Link>
      </li>
      <li onClick={linkClickHandler}>
        <Link href="/about">About</Link>
      </li>
      {
        !AuthCtx.validUser ? <li onClick={linkClickHandler}>
        <Link href="/login">Login</Link>
      </li> : ''
      
      }
      {
        AuthCtx.validUser ? <li onClick={linkClickHandler}>
        <Link href="/tasks">All Tasks</Link>
      </li> : ''
      
      }

      
      {AuthCtx.validUser ? <li onClick={linkClickHandler}>
        <Link href="/add-new">Add Task</Link>
      </li>
      : ''}
      
      {AuthCtx.validUser ? <li className={classes.button_signout} onClick={signOutHandler}>
        Signout
      </li>
      : ''}
      
    </ul>
  </nav>
  )
}

export default Navigation