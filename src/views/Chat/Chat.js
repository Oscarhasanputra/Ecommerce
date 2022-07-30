import React, { useEffect, useState, useRef } from "react";

import { io } from "socket.io-client";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contact";
import axios from "axios"
import {useSelector} from "react-redux"
import { useNavigate, useParams } from "react-router-dom";

const Welcome=()=>{
  return (
  <div className="welcome-chat">
    <img src="/assets/images/robot.gif" alt="" />
    <h1>
      Welcome, there
    </h1>
    <h3>Please select a chat to Start messaging.</h3>
  </div>)
}



export default function Chat() {
  
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setcontacts] = useState(undefined)
  const address = useSelector(
    (state) => state.ContractReducers.contract.wallet
  );
  const contract = useSelector(
    (state) => state.ContractReducers.contract.myContract
  );
  const socket = useSelector(
    (state) => state.SocketReducers
  );
  const {id} = useParams();
  const navigate = useNavigate()
  const ChatListReducers= useSelector((state)=>state.ChatListReducers)
  const ChatReducers= useSelector((state)=>state.ChatReducers)
  useEffect(async () => {
    
    // const data = await JSON.parse(
    //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    // );
    // setCurrentUserName(data.username);
    // setCurrentUserImage(data.avatarImage);
  }, [ChatReducers]);

 
  
  const handleChatChange = (chat) => {
    navigate("/chat/"+chat.id)
    // setCurrentChat(chat);
  };
  return (
    <>
      <div className="chat-container">
        <div className="container">
          <Contacts changeChat={handleChatChange} />
          {id && ChatReducers[id] ?  <ChatContainer currentChat={ChatReducers[id]} socket={socket} />:
          <Welcome/> 
           
          }
        </div>
      </div>
    </>
  );
}
