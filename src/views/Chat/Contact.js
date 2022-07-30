import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "moment";
export default function Contacts({ changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [targetUsers, settargetUsers] = useState({});
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const address = useSelector(
    (state) => state.ContractReducers.contract.wallet
  );
  const contract = useSelector(
    (state) => state.ContractReducers.contract.myContract
  );
  const ChatListReducers = useSelector((state) => state.ChatListReducers);
  const ChatReducers = useSelector((state) => state.ChatReducers);
  useEffect(async () => {
    if (ChatListReducers.length > 0 && ChatReducers) {
      ChatListReducers.map((key, index) => {
        const contact = ChatReducers[key];
        const users = contact.user_id.split(",");
        const indexCurrentUser = users.indexOf(address);
        const targetUserAddress = users[indexCurrentUser == 1 ? 0 : 1];
        contract
          .wallets(targetUserAddress)
          .then(({ email, name, photo, profesi }) => {
            targetUsers[contact.id] = {
              name,
              photo,
              address: targetUserAddress,
            };
            settargetUsers({ ...targetUsers });
          });
      });
    }
    // const data = await JSON.parse(
    //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    // );
    // setCurrentUserName(data.username);
    // setCurrentUserImage(data.avatarImage);
  }, [ChatListReducers, ChatReducers]);

  useEffect(()=>{
    if(contract && address)
    contract.wallets(address).then(({name,photo})=>{
      setCurrentUserName(name)
      setCurrentUserImage(photo)
    })
  },[address])
  const getColor = () => {
    return (
      "hsl(" +
      360 * Math.random() +
      "," +
      (25 + 70 * Math.random()) +
      "%," +
      (80 + 10 * Math.random()) +
      "%)"
    );
  };
  const loadContactUser = () => {
    return [...ChatListReducers,...ChatListReducers,...ChatListReducers,...ChatListReducers,...ChatListReducers,...ChatListReducers,...ChatListReducers].map((key, index) => {
      const contact = ChatReducers[key];

      return (
        <div
          key={index}
          className={`contact ${index === currentSelected ? "selected" : ""}`}
         
          onClick={() => changeCurrentChat(index, contact)}
        >
        
          <div className="avatar" 
           style={{backgroundColor:getColor()}}
          >
            <img
              src={
                targetUsers[contact.id] && targetUsers[contact.id].photo
                  ? targetUsers[contact.id].photo
                  : "/assets/images/profilTest.png"
              }
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
              }}
              alt=""
            />
          </div>
          <div className="username w-100">
            <div className="d-flex flex-row justify-content-between">

            <h3 className="text-line-1">{targetUsers[contact.id] && targetUsers[contact.id].name}</h3>
            {contact && contact.newChats.length>0 && <span className="align-self-center bg-success text-white fw-bolder"
            style={{padding:"5px 11px",borderRadius:50}}
            >{contact.newChats.length}</span>}
            </div>

            <div className="info-chat d-flex flex-row justify-content-between text-muted my-1">
              <span className="text-line-2 " style={{width:"70%"}}>
              {contact.chats &&
                contact.chats.length > 0 &&
                contact.chats[0].message} 
              </span>
            
              <span>
                {contact.chats &&
                  contact.chats.length > 0 &&
                  Moment(contact.chats[0].createdAt).fromNow()}
              </span>
            </div>

            {/* {filterUser(contact)} */}
            {/* <h3>{contact.username}</h3> */}
          </div>
        </div>
      );
    });
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    contact["target_user"] = targetUsers[contact.id];
    changeChat(contact);
  };
  return (
    <>
      <div className="contact-container">
        <div className="brand">
          <h3>snappy</h3>
        </div>
        <div className="contacts">
          {ChatListReducers && ChatListReducers.length > 0 ? loadContactUser() :(
            <div className= "h-100 w-100 d-flex flex-column justify-content-center align-items-center">
              <i
              className="material-icons text-white"
              style={{ verticalAlign: "bottom", fontSize:50}}
            >
              comments_disabled
            </i>
            <span className="title-2">No Chats Available</span>
            </div>
          )}
        </div>
        <div className="current-user">
          <div className="avatar">
            {currentUserImage &&  <img
              style={{
                height:70,
                width:70,
                objectFit:"cover",
                borderRadius:50
              }}
              src={currentUserImage}
              alt="avatar"
            />}
           
          </div>
          <div className="username">
            <span className="title-1 text-white">{currentUserName}</span>
          </div>
        </div>
      </div>
    </>
  );
}
