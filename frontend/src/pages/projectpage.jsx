import React, { useEffect, useState } from "react";

import "./projectpage.css";

import Topbar from "../component/navBar/topbar";
import ProjectPageCard from "../component/projectPageCard/projectPageCard";
import Popup from "reactjs-popup";
import { apiAddress } from "../component/API/api";
import { GetToken } from "../GlobalVariable";
import ErrorpopUp from "../component/popUp/ErrorpopUp";
import { ThreeCircles as Loading } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
const ProjectPage = () => {
  const location = useLocation();
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    setId(id);
    // console.log(id);
  }, [location.search]);
  //   let run = true;
  //   useEffect(() => {
  //     const searchParams = new URLSearchParams(location.search);
  //     const id = searchParams.get("id");
  //     if (run === true) {
  //       const token = GetToken();
  //       setIsLoading(true);
  //       fetch(`${apiAddress}user/getname`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .then((response) => {
  //           console.log("dashboard" + response.status);
  //           setResponseNameCode(response.status);
  //           return response.json();
  //         })
  //         .then((data) => {
  //         //   console.log(data);
  //           setIsLoading(false);
  //         });
  //       fetch(`${apiAddress}todo/projectprogress/${id}`, {
  //         headers: {
  //             'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .then((response) => {
  //           setResponseCode(response.status);
  //           return response.json();
  //         })
  //         .then((datas) => {
  //         //   console.log(data[0].completedPoints);
  //           for (let data of datas) {
  //             // console.log(i);
  //             const newData = {
  //               completedPoints: data.completedPoints,
  //               totalPoints: data.totalPoints,
  //               _id: data._id,
  //               percentage:data.completedPoints/data.totalPoints,
  //             };
  //             // console.log(typeof(newData.percentage))
  //             setLandingPageProgressDataSet((prevData) => [...prevData, newData])
  //           }
  //           setIsLoading(false);
  //         })
  //         .catch((error) => {
  //           // handle errors
  //           console.error(error);
  //         });

  //       run = false;
  //     }
  //   }, []);
  return (
    <div class="ProjectPage">
      <Topbar />
      {isLoading && (
        <Loading
          className="Spinnner"
          type="Puff"
          color="#00BFFF"
          height={300}
          width={window.innerWidth}
        />
      )}

      <div class="ProjectPageBlocks">
        <ProjectPageCard
          key={1}
          projectid={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type={"Progress"}
        />
        <ProjectPageCard
          key={5}
          projectid={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type={"Project Code"}
        />
        <ProjectPageCard
          key={2}
          projectid={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type={"ToDo"}
        />
        <ProjectPageCard
          key={3}
          projectid={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type={"Resources"}
        />
        <ProjectPageCard
          key={4}
          projectid={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type={"Discussion"}
        />
      </div>
    </div>
  );
};

export default ProjectPage;

// class Projectpage extends React.Component {
//     render() {
//         return (
//             <div class = "dashboard">
//                 <Topbar />
//                 <div class='dashboardBlocks'>
//                     {Cards("Progress")}
//                     {Cards("ToDo")}
//                     {Cards("Resources")}
//                     {Cards("Discussion")}
//                 </div>
//             </div>
//         );
//     }
// }

// export  Projectpage };
