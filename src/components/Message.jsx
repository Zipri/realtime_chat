import React, {useContext} from 'react';

import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

import s from './styles.module.css'
import anonymous from '../assets/anonymous.png'

const Message = (props) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    console.log(props.photo)
    return user.uid === props.id
        ?
        <div className={s.myMessageContainer}>
            <div className={s.messageText}>
                {props.text}
            </div>
            <div>
                <img src={props.photo ? props.photo : anonymous} className={s.photo}/>
                <div className={s.name}>
                    {props.name}
                </div>
            </div>
        </div>
        :
        <div className={s.messageContainer}>
            <div>
                <img src={props.photo ? props.photo : anonymous} className={s.photo}/>
                <div className={s.name}>
                    {props.name}
                </div>
            </div>
            <div className={s.messageText}>
                {props.text}
            </div>
        </div>
};

export default Message;