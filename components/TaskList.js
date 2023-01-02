import React from 'react'
import TaskItem from './TaskItem'
import classes from './TaskList.module.scss'

const TaskList = (props) => {
  return (
    <>
      <ul className={classes.task_list}>
        {props.tasks.map(task => { 
          return <TaskItem key={task.id} task={task} />
        })}
      </ul>
      
    </>
  )
}

export default TaskList