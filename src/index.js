import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import App from './App';
import './index.css';

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBldBaRechSgQXYX6BD4_H0PBpBIcEBQCg",
    authDomain: "realtime-chat-8f798.firebaseapp.com",
    projectId: "realtime-chat-8f798",
    storageBucket: "realtime-chat-8f798.appspot.com",
    messagingSenderId: "90032727977",
    appId: "1:90032727977:web:a4fa2dbd4756bc8ef386b8",
});
const auth = firebase.auth();
const firestore = firebase.firestore();
export const Context = createContext(null);

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Context.Provider value={{firebase, auth, firestore}}>
                <App/>
            </Context.Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);