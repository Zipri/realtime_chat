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
            ? <div className={s.userPhotoBody}>
                <div className={s.noGooglePhoto}>
                    There is some problem with google photo in Russia now so you can't see your avatar
                </div>
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
    const [photoURL, setPhotoURL] = useState(props.photoURL);
    const saveNewInfo = () => props.saveInfo(login, photoURL)

    return <div>
        <div>
            <Input style={inputStyle}
                   placeholder={"Photo URL"}
                   value={photoURL}
                   onChange={(e) => setPhotoURL(e.target.value)}/>
        </div>
        <div>
            <Input style={inputStyle}
                   placeholder={"Edit your NickName"}
                   value={login}
                   onChange={(e) => setLogin(e.target.value)}/>
        </div>
        <button className={s.saveNewProfileButton} onClick={saveNewInfo} disabled={!login}>
            Save new information
        </button>
    </div>
}

const Profile = (props) => {
    const {firebase, auth, firestore} = useContext(Context)
    const [user, loading] = useAuthState(auth)
    const [editMode, setEditMode] = useState(false)

    const photo = user.photoURL ? user.photoURL : anonymous
    const photoURL = user.photoURL ? user.photoURL : ''
    const saveInfo = (login, photoURL) => {
        if (photoURL === '') {
            props.setDisplayName(login)
            changeLogin(login).then(() => setEditMode(false))
                .catch((error) => alert(`Oops, something went wrong\n${error.code}: \n${error.message}`))
        } else {
            props.setDisplayName(login)
            props.setPhotoURL(photoURL)
            changeLoginAndPhoto(login, photoURL).then(() => setEditMode(false))
                .catch((error) => alert(`Oops, something went wrong\n${error.code}: \n${error.message}`))
        }
    }

    const changeLogin = async (displayName) => {
        await firebase.auth().currentUser.updateProfile({displayName: displayName})
    }
    const changeLoginAndPhoto = async (displayName, photoURL) => {
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        })
    }

    if (loading) return <Loader/>
    return <div className={s.profileWrapper}>
        {editMode
            ? <EditProfileInfo saveInfo={saveInfo} displayName={user.displayName} photoURL={photoURL}/>
            : <ProfileInfo photoURL={photoURL} photo={photo}
                           displayName={user.displayName} email={user.email}/>}
        {user.providerData[0].providerId !== 'google.com'
            ? <>{editMode
                ? <button className={s.closeEditProfileButton}
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