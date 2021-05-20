import React from "react";
import store from '../../redux/store'
import './chat.css';

export default function ChatMessage(props) {
  const { text, createdAt, handle, imageUrl } = props.message;
  const state = store.getState();

  const messageClass = handle === state.user.credentials.handle ? "right-msg" : "left-msg";

  return (
    <>
      <div className={`msg ${messageClass}`}>
        <div
          className="msg-img"
          style={{
            backgroundImage:
              "url(" + imageUrl ||
              +"https://api.adorable.io/avatars/23/abott@adorable.png)",
              padding :20,
              margin : 20,
              
          }}
        ></div>
        <div className="msg-wrapper">
          <div className="msg-info">
            <div className="msg-info-name">
              {messageClass === "left-msg" ? handle : ""}
            </div>
            <div className="msg-info-time">
              {createdAt}
            </div>
          </div>
          <div className="msg-bubble">
            <div className="msg-text">{text}</div>
          </div>
        </div>
      </div>
    </>
  );
}