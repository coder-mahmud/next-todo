import React, { useState, useContext } from 'react'
import EditIcon from '../ui/icons/EditIcon'
import DeleteIcon from '../ui/icons/DeleteIcon'
import classes from './TaskItem.module.scss'
import TaskContext from '../context/TaskContext'
import CompleteIcon from '../ui/icons/CompleteIcon'

const TaskItem = ({task}) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDate, setTaskDate] = useState(task.date);

  const [isUpdating, setIsUpdating] = useState(false)


  const TaskCtx = useContext(TaskContext);
  //console.log("Context", TaskCtx);
  
  const titleChangeHandler = (e) => {
    setTaskTitle(e.target.value)
  }
  const dateChangeHandler = (e) => {
    setTaskDate(e.target.value)
  }

  const editFormHandler = (e) =>{
    e.preventDefault();
    TaskCtx.modifyTask(task.id, taskTitle, taskDate);
    setIsUpdating(false)
  }

  const deleteButtonHandler = () => {
    let confrimed = `Are you sure to delete ${task.title}`;
    if (confirm(confrimed) == true) {
      TaskCtx.deleteTask(task.id);
    } else {
      
    }  
    
  }

  const editButtonHandler = ()=>{
    setIsUpdating(true)
  }

  const cancelHandler = () => {
    setIsUpdating(false)
  }

  const completeButtonHandler = () =>{
    TaskCtx.setdone(task.id)
  }
  
  let classNames = `${classes.single_tak}  ${task.done? classes.completed : ''}`

  return (
    <>
      <li className={classNames}>
        <div className={classes.task_wrapper}>
          <div className={classes.task_content}>
            <h2>{task.title}</h2>
            <p className={classes.date}>{task.date}</p>
          </div>
          
          <div className={classes.actions}>
            <button onClick={completeButtonHandler}><CompleteIcon /> {task.done ? "Mark as Undone" : "Mark as Done" }</button>
            <button onClick={editButtonHandler}><EditIcon /> Edit</button>
            <button onClick={deleteButtonHandler}><DeleteIcon />Delete</button>
          </div>
        </div>


        {isUpdating ? <div className={classes.edit_form}>
          <form onSubmit={editFormHandler}>
            <input type="text" value={taskTitle} onChange={titleChangeHandler}/>
            <input type="date" value={taskDate} onChange={dateChangeHandler} />
            <button>Update Task</button>
            <button onClick={cancelHandler}>Cancel</button>
          </form>
        </div> : '' }
        
      </li>
    </>
  )
}

export default TaskItem