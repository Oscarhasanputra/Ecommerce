import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import {useSelector} from "react-redux"

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const address = useSelector(
    (state) => state.ContractReducers.contract.wallet
  );
  const contract = useSelector(
    (state) => state.ContractReducers.contract.myContract
  );
  const [chatState, setchatState] = useState({})
//   useEffect(async () => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     const response = await axios.post(recieveMessageRoute, {
//       from: data._id,
//       to: currentChat._id,
//     });
//     setMessages(response.data);
//   }, [currentChat]);

  useEffect(() => {
    console.log(chatState)
    console.log(currentChat)
    if(currentChat){
        axios.get("/chat/"+currentChat.id).then(res=>{
          setMessages(res.data && res.data.chats)
        })
        if(!(currentChat.target_user )){
         
        const users = currentChat.user_id.split(",");
          const indexCurrentUser = users.indexOf(address);
          const targetUserAddress = users[indexCurrentUser == 1 ? 0 : 1];
          contract
            .wallets(targetUserAddress)
            .then(({ email, name, photo, profesi }) => {
             
              chatState['target_user'] = {
                name,
                photo,
                address: targetUserAddress,
              };
              setchatState({...chatState})
            });
        }else{
          setchatState({target_user:currentChat.target_user})
        }
        // setMessages(currentChat.chats)
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
   const dataMsg={
    to: chatState && chatState.target_user && chatState.target_user.address,
    from: address,
    room_id:currentChat.id,
    msg,
   }
   
    socket.emit("send-msg", dataMsg);
    // await axios.post(sendMessageRoute, {
    //   from: data._id,
    //   to: chatState._id,
    //   message: msg,
    // });
   axios.post("/chat",{room_id:currentChat.id,user_target:dataMsg.to,message:msg}).then().catch(err=>{
       
   })

    const msgs = [...messages];
    msgs.push({ user_target :dataMsg.to, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    
    if (socket) {
      //  console.log("chatting open")
      socket.on("msg-recieve", (data) => {
        setArrivalMessage({ user_target : data.to, message: data.msg });
      });
    
    } 
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container-inside">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
            src={chatState && chatState.target_user && chatState.target_user.photo ?chatState.target_user.photo :"/assets/images/profilTest.png"}
            //   src={`data:image/svg+xml;base64,${chatState.avatarImage}`}
              alt=""
              style={{
                height:50,
                width:50,
                borderRadius:50
            }}
            />
          </div>
          <div className="username">
          <h3>{chatState && chatState.target_user && chatState.target_user.name}</h3>
            {/* <h3>{currentChat.username}</h3> */}
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message,index) => {
          return (
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${
                  message.user_target.indexOf(address)>=0 ?  "recieved":"sended" 
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {currentChat && currentChat.id && <ChatInput handleSendMsg={handleSendMsg} />}
      
    </div>
  );
}
