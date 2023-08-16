
import React, { useState, useEffect, useReducer } from "react";
import "./resourcespage.css";
import Topbar from "../component/navBar/topbar";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "reactjs-popup";
import { apiAddress } from "../component/API/api";
import { GetToken } from "../GlobalVariable";
import { useLocation } from "react-router-dom";
import PopUpResource from "../component/popUp/resourcepopup";

const ResourcesPage = () => {
  const [resource, setResources] = useState([]);
  const [reducerValue, forcedUpdate] = useReducer((x) => x + 1, 1);
  const location = useLocation();
  let run = true;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useEffect(() => {
    if (run === true) {
      setResources([])
      const token = GetToken();
      console.log(token);
      setIsLoading(true);
      console.log(token);
      fetch(`${apiAddress}resource/view/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setResponseCode(response.status);
          console.log("Hello");
          return response.json();
        })
        .then((data) => {
          console.log(data.list)
          // console.log(data)
          for (let i = 0; i < data.list.length; i++) {
            const newData = {
              createdAt: data.list[i].createdAt,
              link: data.list[i].link,
              title: data.list[i].title,
              uploadedBy: data.list[i].uploadedBy,
            };
            setResources((preValue) => [...preValue, newData])
          }

        })
        .catch((error) => {
          // handle errors
          console.error(error);
        });

      run = false;
    }
  }, [reducerValue]);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [responseNameCode, setResponseNameCode] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [openError, setOpenError] = useState(false);
  const closeModalError = () => setOpenError(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, changeCompleted] = useState(false);

  return (
    <div class="resourcepage">
      <Topbar />
 <h1 id="resource_title">Resources</h1>
      <div className="resourcesContent">
        <div class="resource_title">
          <h2>Name</h2>
          <h2>Link</h2>
          <h2>Uploaded By</h2>
          <h2>Uploaded On</h2>
        </div>
        <hr id="resource_divider" />
        {resource && (
          <ResourceGenerator data={resource} />
          // resource_listelement(
          // "Ram",
          // "http://www.github.com",
          // "hari",
          // "2010/10/20"
          // )
        )}
      </div>
      <Fab
        onClick={() => setOpen((o) => !o)}
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 32, right: 32, zIndex: 999 }}
      >
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <PopUpResource ForcedReload={forcedUpdate} onClose={closeModal} />
        </Popup>
        <AddIcon />
      </Fab>
    </div>
  );
};

const ResourceGenerator=({data})=> {
 console.log(data) 
  return (
   
    <div className="resource_list">
      {/* {console.log(projectDetails1)}  */}
      {data.map((project) => (
        <Resource_listelement name={project.title} link={project.link} uploadedby={project.uploadedBy} uploadedon={project.createdAt} {...project} />
      ))}
    </div>
  );
}

const Resource_listelement=({name, link, uploadedby, uploadedon}) =>{
  const httplink=link;
  return (
    <div>
        <div class="resource_listelement">
      <h3>{name}</h3>
      <h3>
        <a href={httplink}>{link}</a>
      </h3>
      <h3>{uploadedby}</h3>
      <h3>{uploadedon.toString().slice(0,10)}</h3>
    </div>
   < hr/>
    </div>
  
  );
}

export default ResourcesPage;