import React, {useContext, useState} from 'react';
import {Button, Input} from "antd";

import {Context} from "../index";
import s from './styles.module.css'
import {GoogleLogo} from "../assets/logo";
import {NavLink} from "react-router-dom";


const Login = () => {
    const {auth, firebase} = useContext(Context)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLoginGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(provider).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(`Oops, something went wrong\n${errorCode}: \n${errorMessage}`)
        })
    }

    const handleLoginEmail = () => LoginEmail(email, password)
    const LoginEmail = async (email, password) => {
        await auth.signInWithEmailAndPassword(email, password).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(`Oops, something went wrong\n${errorCode}: \n${errorMessage}`)
        })
    }

    return <div className={s.block}>
        <div className={s.inside}>
            <div className={s.loginForm}>
                <h1>Log in with Email account:</h1>
                <Input type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter e-mail"/>
                <Input type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Enter password"/>
                <Button className={s.size} onClick={handleLoginEmail}>Login</Button>
                <h1>or <NavLink to="/registration">take registration</NavLink></h1>
            </div>
            <div className={s.loginForm}>
                <h1>Log in with <GoogleLogo/>oogle account:</h1>
                <Button className={s.size} onClick={handleLoginGoogle}>Login</Button>
            </div>
        </div>
    </div>
};

export default Login;