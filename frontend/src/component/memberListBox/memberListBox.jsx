import React ,{useState,useEffect} from "react";
import "./memberListBox.css";
import { useLocation } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import avatar from "./../../Images/avatar.png"
import avatar2 from "./../../Images/avatar2.png";
import { apiAddress } from "../API/api";
import { GetToken } from "../../GlobalVariable";

const MemberListBox = () => {
  const location = useLocation();
  const members = [
    { id: 1, names: "Samantha", imgSrc: avatar },
    { id: 2, names: "Carlos", imgSrc: avatar2 },
    { id: 3, names: "Emily", imgSrc: avatar },
    { id: 4, names: "Ryan", imgSrc: avatar2 },
    { id: 5, names: "Maria", imgSrc: avatar },
    { id: 6, names: "Jacob", imgSrc: avatar2 },
    { id: 7, names: "Rachel", imgSrc: avatar },
  ];
  const [responseDataCode, setResponseCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMembers] = useState([]);
  let run = true;
  useEffect(() => {
    if (run === true) {
      setMembers([])
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("id");
      // console.log(id);
      const token = GetToken();
      setIsLoading(true)
      fetch(`${apiAddress}project/view/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setResponseCode(response.status);
          return response.json();
        })
        .then((data) => {
          // console.log(data.members)
          for (let member of data.members) {
            const newData = { name: member.name, id: member._id };
            setMembers((prevData) => [...prevData, newData]);
          }
        })
        .catch((error) => {
          // handle errors
          console.error(error);
        });
      run = false;
    }
  }, []);
  return (
    <div className="memberContainer">
      <div className="memberTitleContainer">
        <h3>Memebers</h3>
      </div>
{member && member.map((items) => (
  console.log(items),
        <MemberListTiles key={items.id} {...items} imgSrc={""} />
      ))}
      {/* <MemberListTiles />
   <MemberListTiles />
   <MemberListTiles />
   <MemberListTiles /> */}
    </div>
  );
};

const MemberListTiles = ({name, imgSrc }) => {
  return (
    <div>
      <div className="member">
        <Avatar className="memberPhoto" alt="image" src={imgSrc} />
        <div className="memberName">{name}</div>
      </div>{" "}
      <div className="dividers"></div>
    </div>
  );
};

export default MemberListBox;
