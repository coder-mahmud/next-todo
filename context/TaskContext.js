import { createContext, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase-config';


const TaskContext = createContext({
  tasks:[],
  setTasks: ()=>{}
})

export const TaskContextProvider = (props) => {

  const [allTasks, setAllTasks] = useState([]);
  
  const setAllTasksHandler = (tasks) => {
    console.log("Adding task called");
    
    setAllTasks(tasks)
  }

  const modifyTaskHandler = (taskId, title,date) =>{
    const newTasks = []
    allTasks.map( async (task) => {
      if(task.id == taskId){
        newTasks.push({id:taskId, title: title, date: date})
        const updateRef = doc(db, "tasks", taskId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(updateRef, {
          title: title,
          date: date,
        
        });        
        return 
      }

      return newTasks.push(task)
    })
    setAllTasks(newTasks);

  }

  const deleteTaskHandler = async (taskId) =>{
    setAllTasks (allTasks.filter(task => task.id != taskId))
    await deleteDoc(doc(db, "tasks", taskId));
    return;

  }

  const doneHandler = (taskId) =>{
    const newTasks = []
    allTasks.map( async (task) => {
      if(task.id == taskId){
        let isDone = !task.done
        newTasks.push({id:taskId, title: task.title, date: task.date, done:!task.done })
        const updateRef = doc(db, "tasks", taskId);

        
        await updateDoc(updateRef, {
          done : isDone
        
        });        
        return 
      }

      return newTasks.push(task)
    })
    setAllTasks(newTasks);
  }



  const taskCtxValue = {

    tasks:allTasks,
    setTasks: setAllTasksHandler,
    modifyTask: modifyTaskHandler,
    deleteTask: deleteTaskHandler,
    setdone: doneHandler,
  }

  return <TaskContext.Provider value={taskCtxValue}>{props.children}</TaskContext.Provider>;
}




export default TaskContext;