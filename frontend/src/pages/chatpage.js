import React, { useState, useEffect, useReducer } from "react";
import "./chatpage.css";
import Chatelement from "../component/chatelement/chatelement";
import Topbar from "../component/navBar/topbar";
import MemberListBox from "../component/memberListBox/memberListBox";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "reactjs-popup";
import { apiAddress } from "../component/API/api";
import { GetToken } from "../GlobalVariable";
import { useLocation } from "react-router-dom";

const Chatpage = () => {
  const msgList = [
    {
      id: 1,
      sender: "Ramesh",
      messege: "Hello",
      isSelfSender: false,
    },
    {
      id: 3,
      sender: "Ramesh",
      messege: "Hello",
      isSelfSender: false,
    },
    {
      id: 4,
      sender: "Ramesh",
      messege: "Hello",
      isSelfSender: false,
    },
    {
      id: 5,
      sender: "Ramesh",
      messege: "Hello",
      isSelfSender: false,
    },
    {
      id: 6,
      sender: "Ramesh",
      messege: "Hello",
      isSelfSender: false,
    },
    {
      id: 7,
      sender: "Ramesh",
      messege: "Hello",
      isSelfSender: false,
    },
    {
      id: 9,
      sender: "Ramesh",
      messege: "Hello",
      isSelfSender: false,
    },
  ];
  const [reducerValue, forcedUpdate] = useReducer(x => x + 1, 1)
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
  const location = useLocation();
  let run = true;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useEffect(() => {
    if (run === true) {
      setSentMessageCollection([])
      const token = GetToken();
      setIsLoading(true);
      fetch(`${apiAddress}chat/see/${id}`, {
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
          // console.log("Hello");
          console.log(data.message);
          for (let i = 0; i < data.message.length; i++) {
            const newData = {
              createdAt: data.message[i].createdAt,
              name: data.message[i].name,
              message: data.message[i].detail
            };
            setSentMessageCollection((preVal) => [ newData,...preVal]);
          }
        })
        .catch((error) => {
          // handle errors
          console.error(error);
        });
      run = false;
    }
  }, [reducerValue]);

  const onPost = () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    console.log(sentMessage);
    const data = { message: sentMessage };
    fetch(`${apiAddress}chat/send/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        setResponseCode(response.status);

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSentMessage("");
        forcedUpdate();
      })
      .catch((error) => {
        // handle errors
        console.error(error);
      });
  };
  return (
    <div class="chatpage">
      <Topbar />
      <div className="Chat_Division">
        <div className="ChatSection">
          <h1 class="chattitle">Discussion</h1>
          <hr id="chatdivider" /><div class="chatinput">
              <input
                type="text"
                placeholder="Type your message..."
                value={sentMessage}
                onChange={(event) => setSentMessage(event.target.value)}
              />
              <button onClick={onPost}>Post</button>
            </div>
          <div class="chat-container">
            <div class="chatpagechats">
            </div>
            {sentMessageCollection && sentMessageCollection.map((msg) => (
              console.log(msg),
              <Chatelement sender={msg.name} messege={msg.message} />
            ))}
            
          </div>
        </div>

        <MemberListBox />
      </div>
    </div>
  );
};

export default Chatpage;