import React from "react";
import "./dashboardCards.css";
import DeadlineBox from "../deadlineBox/deadlineBox";
import CompleteDateBox from "../deadlineBox/completedDateBox";
import { useNavigate } from "react-router-dom";

const Cards = ({ title, createdby, deadline, ImgSrc, isCompleted }) => {
  const navigateToProjectPage=()=>
{
   navigate("/projectPage");
}
const navigate=useNavigate();

  return (
    <div onClick={navigateToProjectPage} class="dashboardCardsBox">
      <img
        className="projectProfilePic"
        src={ImgSrc}
        alt="profile  for project"
      ></img>
      <h5>{title}</h5>
      <p>{createdby}</p>
      {isCompleted ? (
        <CompleteDateBox date={deadline} />
      ) : (
        <DeadlineBox date={deadline} />
      )}
    </div>
  );
};

export { Cards };
