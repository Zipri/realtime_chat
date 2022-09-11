import React, {useContext} from 'react';

import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

import s from './styles.module.css'
import anonymous from '../assets/anonymous.png'
import cn from "classnames";
import {Button} from "antd";

const PhotoAndName = (props) => <div>
    <img src={props.photo ? props.photo : anonymous}
         className={s.photo}
         alt={"userPhoto"}/>
</div>

const MessageText = (props) => <div>
    <div className={s.messageText}>
        {props.text}
        {props.delete && <div className={s.mButtons}>
            <Button style={{
                width: 45,
                borderRadius: 10,
                marginRight: 10
            }}>✎</Button>
            <Button style={{
                width: 45,
                borderRadius: 10,
            }}>🗑</Button>
        </div>}
    </div>
    <div className={s.name}>
        {props.name}
    </div>
</div>

const Message = (props) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return <div className={cn(
        s.messageContainer, {[s.myMessageContainer]: user.uid === props.id})}>
        {user.uid === props.id
            ? <div className={s.mBody}>
                <MessageText text={props.text} name={props.name} delete={true}/>
                <PhotoAndName photo={props.photo}/>
            </div>
            : <div className={s.mBody}>
                <PhotoAndName photo={props.photo}/>
                <MessageText text={props.text} name={props.name}/>
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