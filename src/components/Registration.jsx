import React, {useContext, useState} from 'react';
import {Button, Input} from "antd";

import {Context} from "../index";
import s from "./styles.module.css";

const Registration = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    const {auth} = useContext(Context)


    const handleRegistrationEmail = () => {
        const min = 2
        const max = 25
        if (login.length < min || login.length > max || login.includes(' ')) {
            alert(`Check your Login: the login cannot contain spaces, be less than ${min} or more than ${max} characters)`)
        } else {
            return RegistrationEmail(email, password, login)
        }
    }
    const RegistrationEmail = async (email, password, login) => {
        await auth.createUserWithEmailAndPassword(email, password)
            .then(({user}) => {
                user.updateProfile({displayName: login})
            }).catch((error) => alert(`Oops, something went wrong\n${error.code}: \n${error.message}`))
    }


    return <div className={s.block}>
        <div className={s.inside}>
            <h1>Registration with Email:</h1>
            <Input type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="* Enter e-mail"/>
            <Input type="login"
                   value={login}
                   onChange={(e) => setLogin(e.target.value)}
                   placeholder="* Enter login"/>
            <Input type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="* Enter password"/>
            <Button className={s.size}
                    disabled={!(email && password && login)}
                    onClick={handleRegistrationEmail}>Registration</Button>
        </div>
    </div>
};

export default Registration;