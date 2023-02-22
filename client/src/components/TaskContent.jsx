import React from 'react'
import axios from 'axios';


const TaskContent = (props) => {
    const added = props.added
    const taskName = props.taskName
    const task = props.task
    const id = props.id
    const BACK_URI = process.env.REACT_APP_API_SERVER_URL;

    
    const handleDelete = () => { 
     axios.delete(`${BACK_URI}/api/user/delete/task/${id}`)
    }

  return (
    <div>          
          <div className='task-modal-content'>
              {/* <ListItemText primary={taskName} secondary={task} />   */}
          </div>
          <div className="task-modal-btn-wrapper">
          <div className="edit-task-btn" >edit</div>
          <div className="archive-task-btn" >archive</div>
          <div className="delete-task-btn" onClick={handleDelete}>delete</div>
          </div>
  </div>
  )
}

export default TaskContent