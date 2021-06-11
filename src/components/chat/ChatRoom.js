import React, { useRef, useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextareaAutosize from "react-textarea-autosize";
import "./chat.css";
import store from "../../redux/store";
import config from "../../config";
import Paper from "@material-ui/core/Paper";
import SendIcon from '@material-ui/icons/Send';

firebase.initializeApp(config);

const firestore = firebase.firestore();

export default function ChatRoom() {
	const state = store.getState();
  const { handle, imageUrl } = state.user.credentials;
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

		await messagesRef.add({
			text: formValue,
			createdAt: new Date().toISOString(),
			handle,
			imageUrl,
		});

		setFormValue("");
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
		<Paper  style={{ height: "100%" }} elevation={10} >
		<div style={{
                    
                    textAlign: 'center',
                   marin:'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
					backgroundColor:'#0069c0',
					color:'#fafafa'					
                }}>
				<h1>CHAT-ROOM</h1>
			</div>
			<div id ="growth">
			<main>
				{messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

				<span ref={dummy}></span>
				</main>
			</div>
			<form className="msg-box" onSubmit={sendMessage}>
				<TextareaAutosize
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					placeholder="say something nice"
				/>

				<button className="sendButton" type="submit" disabled={!formValue}>
					<SendIcon/>
				</button>
			</form>
			
			</Paper>
		</>
	);
}
