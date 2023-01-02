import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { app } from '../firebase-config'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'



export default function Home() {

  const AuthCtx = useContext(AuthContext);
  let content;
  if(AuthCtx.validUser){
    content = 'Welcome Back';
  }else{
    content = <p className={styles.large_text}>Welcome to the app! This is a To Do app where you can manage your entries at any time free of cost!<br /> 
    You just need to register on <Link className={styles.link_text}  href="/register">this page</Link> and you are good to go :)
    </p>;
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        {content}
      </main>
    </div>
  )
}
