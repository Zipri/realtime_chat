import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
import TextArea from "antd/es/input/TextArea";

import Loader from "./Loader";
import Message from "./Message";

import s from './styles.module.css'
import anonymous from '../assets/anonymous.png'
import cn from "classnames";


const Chat = () => {
    const endMessagesRef = React.createRef()
    const scrollToBottom = () => endMessagesRef.current?.scrollIntoView()

    const [spacesString, setSpacesString] = useState(false)
    const {firebase, auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState(null)
    const [messages, loading, error] = useCollection(
        firestore.collection('messages').orderBy('createdAt'), {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    )
    useEffect(() => scrollToBottom(), [messages])

    const deleteMessage = (docId) => {
        firestore.collection('messages').doc(docId).delete()
            .catch((error) => alert(`Oops, something went wrong\n${error.code}: \n${error.message}`))
    }

    const editMessage = (docId, text) => {
        firestore.collection('messages').doc(docId).update({
            text: text
        }).catch((error) => alert(`Oops, something went wrong\n${error.code}: \n${error.message}`))
    }

    const handleSendMessage = () => {
        if (value.match(/^\s*$/)) {
            setSpacesString(true)
            setValue('String cannot consist only of spaces')
        } else {
            setSpacesString(false)
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value.replace(/ +/g, ' ').trim(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }).catch((error) => alert(`Oops, something went wrong\n${error.code}: \n${error.message}`))
            setValue('')
        }
    }

    if (loading) return <Loader/>
    return <div className={s.chat}>
        <div className={s.chatWindow} id="element">
            {messages.docs.map((doc) => {
                const photo = doc.data().photoURL && !doc.data().photoURL.includes("google")
                    ? doc.data().photoURL
                    : anonymous
                //из-за проблем с гуглом - не отображается фото, поэтому заглушка
                return <Message
                    id={doc.data().uid}
                    docId={doc.id}
                    photo={photo}
                    name={doc.data().displayName}
                    text={doc.data().text}
                    createdAt={doc.data().createdAt}
                    deleteMessage={deleteMessage}
                    editMessage={editMessage}
                />
            })}
            <div ref={endMessagesRef}/>
        </div>
        <div className={s.sendBlock}>
            <textarea placeholder="Write your message here..."
                      className={cn(s.sendTextArea, {[s.sendTextAreaError]: spacesString})}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}/>
            <button className={cn(s.sendButton, {[s.blockedButton]: !value})}
                    disabled={!value}
                    onClick={handleSendMessage}>Send
            </button>
        </div>
    </div>
};

export default Chat;