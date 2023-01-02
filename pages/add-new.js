import React, { useContext, useRef } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { collection, query, where, getDocs, addDoc, serverTimestamp  } from "firebase/firestore";
import { db } from '../firebase-config';
import AuthContext from '../context/AuthContext';

const AddTodo = () => {

  const AuthCtx = useContext(AuthContext);

  const router = useRouter();
  const titleRef = useRef();
  const dateRef = useRef();

  const addTaskHandler = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const date = dateRef.current.value;
    const docRef = await addDoc(collection(db, "tasks"), {
      title: title,
      date: date,
      done:false,
      timestamp: serverTimestamp(),
      author:AuthCtx.userId
    });
    if(docRef){
      router.push('/tasks');
      console.log("Task addes successfully");
    }else{
      console.log("Something went wrong!");
      
    }
    



  }



  return (
    <>
      <h1>Add new Task</h1>
      <form onSubmit={addTaskHandler}>
        
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef}/>
        </div>

        <div className="form-row">
          <label htmlFor="Date">Date</label>
          <input type="date" id="Date" ref={dateRef} />
        </div>

        <button>Submit</button>



      </form>
    </>
  )
}

export default AddTodo