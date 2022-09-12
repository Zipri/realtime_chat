import React, {useContext, useState} from 'react';

import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

import s from './styles.module.css'
import anonymous from '../assets/anonymous.png'
import cn from "classnames";
import {Button} from "antd";

const PhotoAndName = (props) => <div>
    <img src={(props.photo || props.photo == null) ? props.photo : anonymous}
         className={s.photo}
         alt={"userPhoto"}/>
</div>

const MessageText = (props) => {
    const [value, setValue] = useState(props.text)
    return <div>
        {props.editMode && props.delete
            ? <input className={s.messageText}
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
                {props.text}
                {
                    props.delete && <div className={s.mButtons}>
                        <Button style={{
                            width: 45,
                            borderRadius: 10,
                            marginRight: 10
                        }} onClick={() => props.setEditMode(true)}>✎</Button>
                        <Button style={{
                            width: 45,
                            borderRadius: 10,
                        }} onClick={() => props.deleteMessage(props.docId)}>🗑</Button>
                    </div>
                }
            </div>}
        <div className={s.name}>
            {props.name}
        </div>
    </div>
}

const Message = (props) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [editMode, setEditMode] = useState(false)

    return <div className={cn(
        s.messageContainer, {[s.myMessageContainer]: user.uid === props.id})}>
        {user.uid === props.id
            ? <div className={s.mBody}>
                <MessageText editMode={editMode}
                             setEditMode={setEditMode}
                             text={props.text}
                             name={props.name}
                             docId={props.docId}
                             deleteMessage={props.deleteMessage}
                             editMessage={props.editMessage}
                             delete={true}/>
                <PhotoAndName photo={props.photo}/>
            </div>
            : <div className={s.mBody}>
                <PhotoAndName photo={props.photo}/>
                <MessageText editMode={editMode} setEditMode={setEditMode}
                             text={props.text} name={props.name}/>
            </div>}
    </div>

    // user.uid === props.id
    //     ?
    //     <div className={s.myMessageContainer}>
    //         <div className={s.messageText}>
    //             <div className={s.myMessageText}>
    //                 {props.text}
    //             </div>
    //         </div>
    //         <div>
    //             <img src={props.photo ? props.photo : anonymous} className={s.photo}/>
    //             <div className={s.name}>
    //                 {props.name}
    //             </div>
    //         </div>
    //     </div>
    //     :
    //     <div className={s.messageContainer}>
    //         <div>
    //             <img src={props.photo ? props.photo : anonymous} className={s.photo}/>
    //             <div className={s.name}>
    //                 {props.name}
    //             </div>
    //         </div>
    //         <div className={s.messageText}>
    //             {props.text}
    //         </div>
    //     </div>
};

export default Message;