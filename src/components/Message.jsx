import React, {useContext, useState} from 'react';

import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

import s from './styles.module.css'
import cn from "classnames";
import {Button} from "antd";

const PhotoAndName = (props) => <div>
    <img src={props.photo}
         className={s.photo}
         alt={"userPhoto"}/>
</div>

const MessageText = (props) => {
    const [value, setValue] = useState(props.text)
    return <div>
        {props.editMode && props.delete
            ? <textarea className={s.editMessage}
                     value={value.toString()}
                     onChange={(e) => setValue(e.target.value)}
                     autoFocus={true}
                     onKeyPress={(e) => {
                         if (e.key === 'Enter') {
                             props.editMessage(props.docId, e.target.value)
                             props.setEditMode(false)
                         }
                     }}
                     onBlur={(e) => {
                         props.editMessage(props.docId, e.target.value)
                         props.setEditMode(false)
                     }}/>
            : <div className={s.messageText}>
                <text>{props.text}</text>
                {props.delete && props.isTimeEditEnd && <div className={s.mButtons}>
                        <Button style={{
                            width: 45,
                            borderRadius: 10,
                            marginRight: 10
                        }} onClick={() => props.setEditMode(true)}>✎</Button>
                        <Button style={{
                            width: 45,
                            borderRadius: 10,
                        }} onClick={() => props.deleteMessage(props.docId)}>🗑</Button>
                    </div>}
            </div>}
        <div className={s.underMessage}>
            <div className={s.name}>
                {props.name}
            </div>
            <div className={s.messageTime}>
                {props.timeDate}
            </div>
        </div>
    </div>
}

const Message = (props) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [editMode, setEditMode] = useState(false)
    const date = Math.ceil(Date.now() * 0.001)
    const messageDate = props.createdAt == null ? date : props.createdAt.seconds
    const isTimeEditEnd = date - messageDate < 5000
    const tm = new Date(props.createdAt * 1000)
    const timeDate = tm.getHours().toString()+':'+tm.getMinutes().toString()+' '
        +tm.toDateString().split(' ')[1]+'/'+tm.toDateString().split(' ')[2]


    return <div className={cn(s.messageContainer, {[s.myMessageContainer]: user.uid === props.id})}>
        {user.uid === props.id
            ? <div className={s.mBody}>
                <MessageText editMode={editMode}
                             setEditMode={setEditMode}
                             text={props.text}
                             name={props.name}
                             docId={props.docId}
                             deleteMessage={props.deleteMessage}
                             editMessage={props.editMessage}
                             isTimeEditEnd={isTimeEditEnd}
                             timeDate={timeDate}
                             delete={true}/>
                <PhotoAndName photo={props.photo}/>
            </div>
            : <div className={s.mBody}>
                <PhotoAndName photo={props.photo}/>
                <MessageText editMode={editMode} setEditMode={setEditMode}
                             text={props.text} name={props.name} timeDate={timeDate}/>
            </div>}
    </div>
};

export default Message;