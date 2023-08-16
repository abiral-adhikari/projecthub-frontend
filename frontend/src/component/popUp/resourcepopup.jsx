import React, { useState } from "react";
import "./resourcespopup.css";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useNavigate } from "react-router-dom";
import { apiAddress } from "../../component/API/api";
import { GetToken } from "../../GlobalVariable";
import ErrorpopUp, { PositivepopUp } from "./ErrorpopUp.jsx";
import Popup from "reactjs-popup";
import { useLocation } from "react-router-dom";
const PopUpResource = ({ onClose, ForcedReload }) => {
  const navigateToProjectPage = () => {
    navigate("/projectPage");
  };
  const navigateToDashboardPage = () => {
    navigate("/Dashboard");
    document.location.reload(true)
  };

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [openResponse, setOpenResponse] = useState(false);
  const [openError, setOpenError] = useState(false);
  // const closeModalResponse = () => setOpenResponse(false);
  const closeModalError = () => setOpenError(false);
  const [isCreate, changeisCreate] = useState(true);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [ProjectCode, setProjectCode] = useState(null);
  const location = useLocation();
  const handleCreateSubmit = async (event) => {
    
    event.preventDefault();
    const data = {title,link};
    console.log(data);
    console.log("1");
     const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
      try {
        const response = await fetch(`${apiAddress}resource/create/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GetToken()}`,
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.status === 200) {
          setProjectCode(result.code);
          console.log(`Successfully created`);
          setOpenResponse((o) => !o);
        } else {
          console.log(result.error);
          setErrorMsg(result.error);
          setOpenError((o) => !o);
          console.log();
        }
      } catch (error) {
        console.error(error);
        console.log("3");
      }
      ForcedReload()
      // onClose();
    };

  //   const handleJoinSubmit = async (event) => {
  //     event.preventDefault();
  //     const data = { code };
  //     console.log(code);
  //     try {
  //       const response = await fetch(`${apiAddress}resource/create/${id}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${GetToken()}`,
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       const result = await response.json();
  //       if (response.status === 200) {
  //         console.log(result);
  //         console.log(`Successfully joined`);
  //         setOpenResponse((o) => !o);
  //       } else {
  //         console.log(result.error);
  //         setErrorMsg(result.error);
  //         setOpenError((o) => !o);
  //         console.log();
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       console.log("3");
  //     }
  //     ForcedReload()
  // };

  // const handleDateChange = (date) => {
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
  //   const day = date.getDate();
  //   const newDate = new Date(`${year}-${month}-${day}`);
  //   setDeadline(newDate);
  // };

  return (
    <div className="modal">
      <Popup
        open={openResponse}
        closeOnDocumentClick onClose={navigateToDashboardPage}
      >
        <PositivepopUp
          PositiveHeading={"Your resource has been added"}
          Positivemsg={""}
          onClose={() => navigateToDashboardPage}
        />
      </Popup>

      <Popup open={openError} closeOnDocumentClick onClose={closeModalError}>
        <ErrorpopUp Errormsg={errorMsg} onClose={closeModalError} />
      </Popup>

      <div className="LandingpopUpDiv " style={{ background: "transparent" }}>
        {isCreate ? (
          <form className="Landingpopup-form" onSubmit={handleCreateSubmit}>
            <div className="iconDiv">
              <LibraryAddOutlinedIcon
                fontSize="large"
                className="assignmentIcon"
              />
            </div>
            <br></br>
            <div>
              <InputField
                label={"Resource Name :"}
                type={"text"}
                placeholder={"Resource Name"}
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />

              <InputField
                label={"Resource Link :"}
                type={"text"}
                placeholder={"Resource Link"}
                onChange={(event) => setLink(event.target.value)}
                value={link}
              />

              <br />
              <button className="assignbutton ">Add Resource</button>
            </div>
          </form>
        ) : (
          <form className="Landingpopup-form">
            <div className="iconDiv">
              <LibraryAddOutlinedIcon
                fontSize="large"
                className="assignmentIcon"
              />
            </div>
            <br></br>
            <div>
              <InputField
                label={"Project Code:"}
                type={"text"}
                placeholder={"Project code"}
                onChange={(event) => setCode(event.target.value)}
                value={code}
              />
              {/* <InputField
                label={"Time for this project per days (in Hours):"}
                type={"number"}
                placeholder={"Time for this project per days"}
                onChange={(event) => setProjectTime(event.target.value)}
                value={projectTime}
              /> */}
              <button className="assignbutton " type="submit">
                Join Project
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default PopUpResource;
