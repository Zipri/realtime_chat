import React, {useContext} from 'react';

import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";

import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import Loader from "./components/Loader";

import 'antd/dist/antd.css';
import './App.css';


const App = () => {
    const {auth} = useContext(Context)
    const [user, loading, error] = useAuthState(auth)

    if (loading) return <Loader/>
    return <div className="App">
        <Header photoURL={user ? user.photoURL : null} displayName={user ? user.displayName : null}
                user={user} auth={auth}/>
        <AppRouter/>
    </div>
};

//TODO сброс пароля
//TODO добавить смену темы
//TODO плавающее окно профиля с сохарнением координат в файербейс

export default App;
