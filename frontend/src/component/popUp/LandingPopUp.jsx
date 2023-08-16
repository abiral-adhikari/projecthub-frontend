import React, { useState } from "react";
import "./LandingPopUp.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectorDropDown from "../SelectorDropDown/SelectorDropDown";
//
const PopUpToDo = ({ onClose, onPressed, contentInfo, changeContentInfo }) => {
  const onAddTask = (title, label, projectTitle, projectSubTitle, date) => {
    const newtaskInfo = {
     
      title: title, id: contentInfo[contentInfo.length - 1].id + 1,
      label: label,
      projectTitle: projectTitle,
      projectSubTitle: projectSubTitle,
      date: date.toISOString().slice(0,10),
    };
    
  
    changeContentInfo([...contentInfo,newtaskInfo]);
    // console.log([contentInfo]);
  };
  const [projectLabel, setProjectLabel] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  // const [projectSubDescription, setProjectSubDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projectCategory, setProjectCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      projectCategory,
      projectLabel,
      projectName,
      projectDescription,
      selectedDate,
    });

    onAddTask(
      projectCategory,
      projectLabel,
      projectName,
      projectDescription,
      selectedDate
    );
    onClose();
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
    const day = date.getDate();
    const newDate = new Date(`${year}-${month}-${day}`);
    setSelectedDate(newDate);
  };

  // ${onClose?"closed":"opened"}
  return (
    <div className="modal">
      <div className="LandingpopUpDiv " style={{ background: "transparent" }}>
        <form className="Landingpopup-form" onSubmit={handleSubmit}>
          <div className="iconDiv">
            <AssignmentIcon fontSize="large" className="assignmentIcon" />
          </div>
          <SelectorDropDown setProjectCategory={setProjectCategory} />
          <InputField
            label={""}
            type={"text"}
            placeholder={"Project Label"}
            onChange={(event) => setProjectLabel(event.target.value)}
            value={projectLabel}
          />
          <InputField
            label={""}
            type={"text"}
            placeholder={"Project Name"}
            onChange={(event) => setProjectName(event.target.value)}
            value={projectName}
          />
          <InputField
            label={""}
            type={"text"}
            placeholder={"Project Description"}
            onChange={(event) => setProjectDescription(event.target.value)}
            value={projectDescription}
          />
           <InputField
            label={""}
            type={"number"}
            placeholder={"Task Points"}
            onChange={(event) => setProjectDescription(event.target.value)}
            value={projectDescription}
          />
           <InputField
            label={""}
            type={"text"}
            placeholder={"Assigned to:"}
            onChange={(event) => setProjectDescription(event.target.value)}
            value={projectDescription}
          />

          <DatePicker
            className="DateBox"
            selected={selectedDate}
            onChange={handleDateChange}
          />

          <br />
          <button className="assignbutton " type="submit">
            Assign
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopUpToDo;
