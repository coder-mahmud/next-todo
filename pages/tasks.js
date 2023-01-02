import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase-config';
import TaskList from '../components/TaskList';
import { TaskContextProvider } from '../context/TaskContext';
import TaskContext from '../context/TaskContext';
import Link from 'next/link';
import classes from './Tasks.module.scss'



const AllTasks =  () => {
//  console.log("Component Running!");

  const TaskCtx = useContext(TaskContext)
  const AuthCtx = useContext(AuthContext)

  
  useEffect(()=>{
    getTaks();       
  },[AuthCtx])

  const getTaks = async () => {
    const q = query(collection(db, "tasks"), orderBy("timestamp", "desc"), where("author", "==", AuthCtx.userId ) );

    // const querySnapshot = await getDocs(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);
    const taskArr = [];
    
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      taskArr.push({id:doc.id ,title:doc.data().title, date: doc.data().date, done:doc.data().done })     
    });

    //console.log("Array", taskArr);
    
    TaskCtx.setTasks(taskArr);
    //console.log("T C", TaskCtx);

  }

  console.log("Context", TaskCtx);

  let content;
  if(TaskCtx.tasks.length > 0){
    content = <TaskList tasks={TaskCtx.tasks} />
  }else{
    //content = 'No Task found! Add new ' + <Link href="/add-new" > here. </Link>
    content = <Link className='text-link' href="/add-new">No Task found! Add here by clicking this link</Link>
  }


  return (
    <>
      <h1>All Tasks</h1>
      {content}
    </>
  )
}

export default AllTasks