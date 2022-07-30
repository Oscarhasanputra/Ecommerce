import React, { useState } from "react";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="chatinput-container">
      <div className="button-container">
        <div className="emoji">
          {/* <span>Smile emoji</span> */}
          <span className="material-icons" style={{
            fontSize:35,
            color:"#e8ff0a",
            cursor:"pointer"
            
          }}
          onClick={handleEmojiPickerhideShow}
          >add_reaction</span>
          {/* <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} /> */}
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          {/* <IoMdSend /> */}
          <span className="material-icons text-success" style={{
            padding:"10px 20px"
          }}>send</span>
        </button>
      </form>
    </div>
  );
}
