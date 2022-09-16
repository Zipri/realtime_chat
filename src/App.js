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


//TODO добавить новых провайдеров
//TODO добавить смену темы
//TODO отлавливать ошибки сообщений
//TODO сброс пароля
//TODO плавающее окно профиля с сохарнением координат в файербейс
//TODO А если вставить перенос строки, то чат его проигнорирует и сохранит сообщение в одну строку.
//TODO добавить статус "изменино"
export default App;
