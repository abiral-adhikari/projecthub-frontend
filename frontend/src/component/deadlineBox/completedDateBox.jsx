import React from 'react'
import "./deadlineBox.css";
const CompleteDateBox = ({date}) => {
  return (
    <div style={{display:"flex" ,color:"green"}}>
      Completed on : <div className="deadlinedatebox">{date}</div>
    </div>
  )
}

export default CompleteDateBox;
