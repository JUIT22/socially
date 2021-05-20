import React, { useRef, useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase/app";
import {  firestore } from "../firebaseConst";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextareaAutosize from "react-textarea-autosize";
import './chat.css';
import store from '../../redux/store';

firebase.initializeApp({
  apiKey: "AIzaSyBfiChOSRUmtiJB-YU57yxMxVv067XmsU0",
  authDomain: "juit-socially.firebaseapp.com",
  projectId: "juit-socially",
  storageBucket: "juit-socially.appspot.com",
  messagingSenderId: "625307113396",
  appId: "1:625307113396:web:4749c1ff24fb85da2a04e1",
  measurementId: "G-EZLDM0SLES"
});

const firestore = firebase.firestore();

export default function ChatRoom() {

  //console.log(auth);
  const state = store.getState();
  console.log(state);
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    const userId=state.user.credentials.handle;
    const imageUrl=state.user.credentials.imageUrl;

    //const { userId, imageUrl } = auth.currentUser;
    //console.log(auth.currentUser);

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId,
      imageUrl
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form className="msg-box" onSubmit={sendMessage}>
        <TextareaAutosize
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button className="sendButton" type="submit" disabled={!formValue}>
          <span role="img">🗯</span>
        </button>
      </form>
    </>
  );
}