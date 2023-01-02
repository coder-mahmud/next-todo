import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import classes from './Layout.module.scss'
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import AuthContext from '../context/AuthContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config';
import SmileIcon from './icons/icons';
import Navigation from './Navigation';
import Hambruger from './icons/Hambruger';


const Layout = (props) => {
  
  const auth = getAuth();
  const AuthCtx = useContext(AuthContext);
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonClickHandler = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  }

  const linkClickHandler = () => {
    setMenuOpen(false);
  }
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      //console.log("ID",uid);
      AuthCtx.addUserId(user.uid);
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      //console.log("snapshot:", querySnapshot);
      //console.log("type", typeof(querySnapshot));
      
      
      querySnapshot.forEach((doc) => {
        //console.log("Returned Doc:", doc);
        
        //console.log(doc.id, " => ", doc.data());


        AuthCtx.addFirstName(doc.data().first);
        AuthCtx.addLastName(doc.data().last);
        AuthCtx.addEmail(doc.data().email);
        AuthCtx.addValidUser(true)
      });


      // ...
    } else {
      // User is signed out
      // ...
      console.log("No user found!");
      AuthCtx.addValidUser(false);
    }
  });



  const taskAddHandler = ()=>{
    console.log('Adding task!')
  }

  const menu_classes = `${classes.mobile_menu_icon} ${menuOpen ? classes.menu_icon_open : ''}`

  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
        <div className={classes.logo_container}> <Link href="/">Logo</Link></div>
        <div className={classes.menu_container}>
        
        <div className={menu_classes} onClick={menuButtonClickHandler}>
          <Hambruger />
        </div>        
        <Navigation menuOpen={menuOpen} linkClickHandler={linkClickHandler} />


        </div>
        
        </div>
      </header>



      <main>

        <div className={classes.container}>
          {AuthCtx.validUser ? <div className="userInfo">
            <p className={classes.flex}>Welcome  &nbsp; <b>{AuthCtx.firstName} {AuthCtx.lastName}</b> <span className={classes.smile}>  <SmileIcon /> </span> .</p>
            {/* <p>Your registred email: {AuthCtx.email}</p> */}
          </div> : ''}
          

          {props.children}

        </div>
        
      </main>
    </>
  )
}

export default Layout