import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

import {CHAT_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";

import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

import s from './styles.module.css'
import anonymous from '../assets/anonymous.png'
import Profile from "./Profile";

const Header = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const [profileForm, setProfileForm] = useState(false)

    return <div className={s.header}>
        <div className={s.logo}>
            <NavLink to={CHAT_ROUTE}>
                <text>RealTime Chat</text>
            </NavLink>
        </div>
        <div className={s.login}>
            {user
                ? <div>
                    <button className={s.openProfileButton} onClick={() => setProfileForm(!profileForm)}>
                        <img src={user.photoURL && !user.photoURL.includes("google")
                            ? user.photoURL
                            : anonymous} className={s.smallPhoto}
                             alt={"profilePhoto"}/>
                        <text className={s.nickname}>
                            {user.displayName}
                        </text>
                    </button>
                    <button className={s.headerButton}
                            onClick={() => auth.signOut()}>Exit
                    </button>
                </div>
                : <button className={s.headerButton}
                          onClick={() => navigate(LOGIN_ROUTE)}>Login</button>}
        </div>
        {profileForm && <Profile/>}
    </div>
};

export default Header;