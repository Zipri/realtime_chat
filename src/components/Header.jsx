import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

import {CHAT_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";

import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

import s from './styles.module.css'
import anonymous from '../assets/anonymous.png'
import Profile from "./Profile";
import cn from "classnames";

const Header = (props) => {
    const navigate = useNavigate()
    const [profileForm, setProfileForm] = useState(false)
    const [photoURL, setPhotoURL] = useState(props.photoURL)
    const [displayName, setDisplayName] = useState(props.displayName)
    useEffect(() => {
        setPhotoURL(props.photoURL)
        setDisplayName(props.displayName)
    }, [props.user])

    return <div className={s.header}>
        <div className={s.logo}>
            <NavLink to={CHAT_ROUTE}>
                <text>RealTime Chat</text>
            </NavLink>
        </div>
        <div className={s.login}>
            {props.user
                ? <div>
                    <button className={cn({[s.openProfileButton]: !profileForm},
                        {[s.closeProfileButton]: profileForm})}
                            onClick={() => setProfileForm(!profileForm)}>
                        <img src={photoURL && !photoURL.includes("google") ? photoURL : anonymous}
                             className={s.smallPhoto}
                             alt={"profilePhoto"}/>
                        <text className={s.nickname}>
                            {displayName}
                        </text>
                    </button>
                    <button className={s.headerButton}
                            onClick={() => props.auth.signOut()}>Exit
                    </button>
                </div>
                : <button className={s.headerButton}
                          onClick={() => navigate(LOGIN_ROUTE)}>Login</button>}
        </div>
        {profileForm && <Profile setPhotoURL={setPhotoURL} setDisplayName={setDisplayName}/>}
    </div>
};

export default Header;