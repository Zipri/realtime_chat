import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import TextArea from "antd/es/input/TextArea";

import Loader from "./Loader";
import Message from "./Message";

import s from './styles.module.css'


const Chat = () => {
    const endMessagesRef = React.createRef()
    const scrollToBottom = () => endMessagesRef.current?.scrollIntoView()

    const {firebase, auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState(null)
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )
    useEffect(() => scrollToBottom(), messages)

    const handleSendMessage = () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setValue(null)
    }

    const smallSize = () => {
        messages.map((item, id) => {
            document.getElementsByClassName(s.messageText)[id].style= "font-size: 15px"
        })
    }
    const normalSize = () => {
        messages.map((item, id) => {
            document.getElementsByClassName(s.messageText)[id].style= "font-size: 20px"
        })
    }
    const bigSize = () => {
        messages.map((item, id) => {
            document.getElementsByClassName(s.messageText)[id].style= "font-size: 30px"
        })
    }

    if (loading) return <Loader/>
    return <div className={s.chat}>
        <div className={s.chatWindow} id="element">
            {messages.map(message => <Message id={message.uid}
                                              photo={message.photoURL}
                                              name={message.displayName}
                                              text={message.text}/>)}
            <div ref={endMessagesRef}></div>
            <button onClick={smallSize} className={s.sizeButton}>small text size</button>
            <button onClick={normalSize} className={s.sizeButton}>normal text size</button>
            <button onClick={bigSize} className={s.sizeButton}>big text size</button>
        </div>
        <div className={s.sendBlock}>
            <TextArea placeholder="Write your message here..."
                      value={value}
                      onPressEnter={handleSendMessage}
                      onChange={(e) => setValue(e.target.value)}/>
            <button className={s.sendButton}
                    onClick={handleSendMessage}>Send
            </button>
        </div>
    </div>
};

export default Chat;