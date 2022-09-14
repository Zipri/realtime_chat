import React, {useContext, useEffect, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Loader from "./Loader";
import s from "./styles.module.css";
import anonymous from "../assets/anonymous.png";
import {Button, Input} from "antd";

const ProfileInfo = (props) => <div>
    <div>
        {props.photoURL.includes("google")
            ? <div className={s.noGooglePhoto}>
                There is some problem with google photo in Russia now so you can't see your avatar
            </div>
            : <div className={s.userPhotoBody}>
                <img src={props.photo}
                     className={s.userPhoto}
                     alt={"photoURL"}/>
            </div>}
    </div>
    <div className={s.displayName}>
        {props.displayName}
    </div>
    <div className={s.email}>
        {props.email}
    </div>
</div>

const EditProfileInfo = (props) => {
    const inputStyle = {borderRadius: 10, marginBottom: 5, fontSize: 20, padding: 5, width: 'min-content'}
    const [login, setLogin] = useState(props.displayName);

    return <div>
        <div>
            <Input style={inputStyle}
                   placeholder={"Edit your NickName"}
                   value={login}
                   onChange={(e) => setLogin(e.target.value)}/>
        </div>
        <button className={s.saveNewProfileButton}
                onClick={() => props.saveInfo(login)}>Save new information
        </button>
    </div>
}

const Profile = () => {
    const {firebase, auth, firestore} = useContext(Context)
    const [user, loading] = useAuthState(auth)
    const [editMode, setEditMode] = useState(false)

    const photo = user.photoURL ? user.photoURL : anonymous
    const photoURL = user.photoURL ? user.photoURL : "null"
    const saveInfo = (login) => changeLogin(login).then(() => setEditMode(false))
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(`Oops, something went wrong\n${errorCode}: \n${errorMessage}`)
        })

    const changeLogin = async (displayName) => {
        await firebase.auth().currentUser.updateProfile({displayName: displayName})
    }

    if (loading) return <Loader/>
    return <div className={s.profileWrapper}>
        {editMode
            ? <EditProfileInfo saveInfo={saveInfo} displayName={user.displayName}/>
            : <ProfileInfo photoURL={photoURL} photo={photo}
                           displayName={user.displayName} email={user.email}/>}
        {user.providerData[0].providerId !== 'google.com'
            ? <>{editMode
                ? <button className={s.editProfileButton}
                          onClick={() => setEditMode(false)}>Close edit mode</button>
                : <button className={s.editProfileButton}
                          onClick={() => setEditMode(true)}>Edit profile info</button>}</>
            : <div className={s.linkEditProfile}>
                <a href={"https://myaccount.google.com/personal-info"}
                   target={"_blank"}>Visit Google to edit information</a>
            </div>}
    </div>
};


export default Profile;