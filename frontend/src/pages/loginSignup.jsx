import React from "react";
import "./login_Signup.css";
import BackGroundImg from "../Images/ProjectHubBackGround.png"
import FormBox from "../component/Sign_Login_Component/From_Main_Box/form_Main_box";
const logIn = () => {
  return (
    <div 
      style={{backgroundImage:`url(${BackGroundImg})` ,
        textAlign: "center",
        // background:
        //   "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(40,37,145,0.9417016806722689) 48%, rgba(0,212,255,1) 100%)",
        height: "100vh",
      }}
    >
      <FormBox />
    </div>
  );
};

export default logIn;
