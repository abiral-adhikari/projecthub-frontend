import React, { useEffect, useState, useReducer } from "react";
import "./profilePage.css";
import Topbar from "../component/navBar/topbar.js";
import Skillbox from "../component/skillbox/skillbox.js";
import { alphanumericToNumber, selectHobbies } from "./otherfunctions";
import profilePic_1 from "../Images/avatar.png";
import profilePic_2 from "../Images/avatar2.png";
import profilePic_4 from "../Images/avatar7.png";
import profilePic_5 from "../Images/avatar5.png";
import profilePic_6 from "../Images/avatar6.png";
import { GetToken } from "../GlobalVariable";
import { apiAddress } from "../component/API/api";
import { useLocation } from "react-router-dom";
const ProfilePage = () => {
  const [reducerValue, forcedUpdate] = useReducer((x) => x + 1, 1);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [responseNameCode, setResponseNameCode] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, changeCompleted] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [sentMessageCollection, setSentMessageCollection] = useState([]);

  const token = GetToken();
  const seed = alphanumericToNumber(token);
  var pic = profilePic_1;

  const descriptions = [
    "I spend hours poring over code, trying to find that one elusive bug that's causing all the problems. But when I finally track it down and squash it, it's all worth it.",
    "I love nothing more than a good challenge. When I'm faced with a tough programming problem, I roll up my sleeves and get to work, exploring all possible solutions until I find the one that works best.",
    "I'm always on the lookout for new and creative ways to solve problems. Whether it's a new technology or a new approach to an old problem, I'm not afraid to try something new and push the boundaries of what's possible.",
    "I believe that the best solutions come from working together. Whether it's pair programming, code reviews, or just bouncing ideas off each other, I love collaborating with other developers to create something great.",
    "I'm constantly looking for ways to make things faster, more efficient, and more streamlined. Whether it's optimizing code or processes, I love finding ways to squeeze every last drop of performance out of a system.",
    "I'm always eager to learn more and expand my knowledge. Whether it's a new programming language or a new tool, I'm not afraid to dive in and figure things out.",
    "I'm a stickler for clean, organized code. I believe that well-structured code is easier to read, maintain, and debug, and I always strive to write code that meets these standards.",
    "I'm a big fan of automation. Whether it's automating tests, builds, or deployments, I love finding ways to automate repetitive tasks and free up time for more important work.",
    "I'm always thinking about the end user. Whether it's designing a user interface or writing documentation, I believe that the ultimate goal of any programming project is to create something that's intuitive, user-friendly, and accessible to everyone.",
    "I'm passionate about programming, and I love nothing more than turning an idea into a working piece of software. Whether it's a small script or a large-scale application, there's nothing quite like the feeling of creating something that works."
  ];
  
  const about = descriptions[seed%10];
  console.log(about);
  const pic_selector = (seed % 6) + 1;
  switch (pic_selector) {
    case 1:
      pic = profilePic_1;
      break;
    case 2:
      pic = profilePic_2;
      break;
    case 3:
      pic = profilePic_4;
      break;
    case 4:
      pic = profilePic_5;
      break;
    default:
      pic = profilePic_6;
  }
  const [detail, setDetail] = useState({});
  const location = useLocation();
  let run = true;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useEffect(() => {
    if (run === true) {
      // setSentMessageCollection([])
      const token = GetToken();
      setIsLoading(true);
      fetch(`${apiAddress}user/viewprofile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.status);
          setResponseCode(response.status);
          return response.json();
        })
        .then((data) => {
          //   console.log(data);
          const newData = {
            dob: data.dob,
            email: data.email,
            gender: data.gender,
            gitlink: data.gitlink,
            name: data.name,
            phonenumber: data.phonenumber,
            _id: data._id,
          };

          setDetail(newData);
        })
        .catch((error) => {
          // handle errors
          console.error(error);
        });
      run = false;
    }
  }, [reducerValue]);
  return (
    <div>
      <Topbar />
      <div className="allpageprofile">
        <div className="profile-page">
          {
            //detail use garera tala ma data vara yo maile check garna matra initizlize garya xu 
            detail && console.log(detail)
          }
          <div className="profile-info">
            <img src={pic} alt="Profile" />
            <h2>{detail.name}</h2>
            <p>{detail.email}</p>
            <p>{detail.gitlink}</p>
            <p>{detail.phonenumber}</p>
          </div>
        </div>
        <div className="other-details">
          <div classname="skills">
            <h1 id="aboutmeprofile">About Me </h1>
            <div className="skilllist">
              <br />
              <br />
              <p>
                {about}
              </p>
            </div>
          </div>
          <br />
          <br />
          <hr />
          <div classname="skills">
            <h1>Interest</h1>
            <div className="skilllist">
              {Skillbox(selectHobbies(5, seed).slice(0, 1))}
              {Skillbox(selectHobbies(5, seed).slice(1, 2))}
              {Skillbox(selectHobbies(5, seed).slice(2, 3))}
              {Skillbox(selectHobbies(5, seed).slice(3, 4))}
              {Skillbox(selectHobbies(5, seed).slice(4, 5))}
            </div>
          </div>
          <br />
          <br />
          <hr />
          <div classname="skills">
            <h1>Skills</h1>
            <div className="skilllist">
              {Skillbox("C++")}
              {Skillbox("Python")}
              {Skillbox("JavaScript")}
              {Skillbox("React")}
              {Skillbox("Design")}
            </div>
          </div>
        </div>
      </div>
      <div className="projectprogress">
        <h1></h1>
      </div>
    </div>
  );
};

export default ProfilePage;
