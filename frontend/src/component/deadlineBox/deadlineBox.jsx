import React from 'react'
import "./deadlineBox.css";

const DeadlineBox = ({date}) => {
  return (
    <div style={{display:"flex" ,color:"red"}}>
      Deadline : <div className="deadlinedatebox">{date}</div>
    </div>
  )
}

export default DeadlineBox
