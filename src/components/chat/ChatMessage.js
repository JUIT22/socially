import React, { Component } from 'react'

export default function ChatMessage(props) {
    const {text,userId,imageUrl} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
        return (
            <div className={`message ${messageClass}`}>
                <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
                <p>{text}</p>
            </div>
        )
    }

