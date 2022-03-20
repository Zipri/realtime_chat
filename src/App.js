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
    return (
        <div className="App">
            <Header/>
            <AppRouter/>
        </div>
    );
};


//TODO выложить на хостинг или как там его
//TODO добавить добавление чего нибудь + D'n'D
//TODO допилить масштабы

export default App;
