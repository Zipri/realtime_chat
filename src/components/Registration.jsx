import React, {useContext, useState} from 'react';
import {Button, Input} from "antd";

import {Context} from "../index";
import s from "./styles.module.css";

const Registration = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    const {auth} = useContext(Context)


    const handleRegistrationEmail = () => RegistrationEmail(email, password, login)
    const RegistrationEmail = async (email, password, login) => {
        await auth.createUserWithEmailAndPassword(email, password)
            .then(({user}) => {
                user.updateProfile({displayName: login})
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(`Oops, something went wrong\n${errorCode}: \n${errorMessage}`)
            })
    }


    return <div className={s.block}>
        <div className={s.inside}>
            <h1>Registration with Email:</h1>
            <Input type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter e-mail"/>
            <Input type="login"
                   value={login}
                   onChange={(e) => setLogin(e.target.value)}
                   placeholder="Enter login"/>
            <Input type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Repeat password"/>
            <Button className={s.size} onClick={handleRegistrationEmail}>Registration</Button>
        </div>
    </div>
};

export default Registration;