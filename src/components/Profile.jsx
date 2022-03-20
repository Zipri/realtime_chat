import React, {useContext, useEffect, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Loader from "./Loader";
import s from "./styles.module.css";
import anonymous from "../assets/anonymous.png";

const Profile = () => {
    const [editMode, setEditMode] = useState(false)
    const [editAvatar, setEditAvatar] = useState(false)
    const {firebase, auth, firestore} = useContext(Context)
    const [user, loading] = useAuthState(auth)
    const [login, setLogin] = useState(user.displayName);
    const [photoURL, setPhotoURL] = useState(null);
    useEffect(() => <Loader/>, [user])

    const changeAvatar = async (photoURL) => {
        await firebase.auth().currentUser.updateProfile({photoURL: photoURL})
        window.location.reload()
    }
    const handleChangeAvatar = () => changeAvatar(photoURL)
    const changeLogin = async (displayName) => {
        await firebase.auth().currentUser.updateProfile({displayName: displayName})
        window.location.reload()
    }
    const handleChangeLogin = () => changeLogin(login)
    const handleCopy = () => copyEmail()
    const copyEmail = () => navigator.clipboard.writeText(user.email)

    if (loading) return <Loader/>
    return <div className={s.block}>
        <div className={s.inside}>
            <div className={s.myField}>
                {!editAvatar
                    ? <img src={user.photoURL ? user.photoURL : anonymous}
                           className={s.largePhoto}
                           onClick={() => setEditAvatar(true)}/>
                    : <input autoFocus
                             placeholder="Input URL of your new photo"
                             className={s.inputAvatar}
                             onBlur={() => setEditAvatar(false)}
                             onChange={(e) => setPhotoURL(e.target.value)}/>}
            </div>
            <button className={s.profileButton} onClick={handleChangeAvatar}>Change Avatar</button>

            <div className={s.myField}>
                <text>Login:</text>
                {!editMode
                    ? <div onClick={() => setEditMode(true)}>{user.displayName}</div>
                    : <input autoFocus
                             className={s.inputLogin}
                             value={login}
                             onBlur={() => setEditMode(false)}
                             onChange={(e) => setLogin(e.target.value)}/>}
            </div>
            <button className={s.profileButton} onClick={handleChangeLogin}>Change Login</button>

            <div className={s.myField}>
                <text id="Email">Email:</text>
                {user.email}
            </div>
            <button className={s.profileButton} onClick={handleCopy}>Copy Email</button>
        </div>
    </div>
};

export default Profile;