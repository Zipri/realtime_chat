import React, {useContext, useEffect, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Loader from "./Loader";
import s from "./styles.module.css";
import anonymous from "../assets/anonymous.png";
import {Button} from "antd";

const ProfileInfo = (props) => <div>
    <div>
        {props.photoURL.includes("google")
            ? <div className={s.noGooglePhoto}>
                There is some problem with google photo in Russia now so you can't see your avatar
            </div>
            : <img src={props.photo} alt={"photoURL"}/>}
    </div>
    <div className={s.displayName}>
        {props.displayName}
    </div>
    <div className={s.email}>
        {props.email}
    </div>
</div>

const EditProfileInfo = (props) => <div>123</div>

const Profile = () => {
    const {firebase, auth, firestore} = useContext(Context)
    const [user, loading] = useAuthState(auth)
    const [editMode, setEditMode] = useState(false)

    const photo = user.photoURL ? user.photoURL : anonymous
    const saveInfo = () => {
        setEditMode(false)
    }

    if (loading) return <Loader/>
    return <div className={s.profileWrapper}>
        {editMode
            ? <EditProfileInfo/>
            : <ProfileInfo photoURL={user.photoURL} photo={photo}
                           displayName={user.displayName} email={user.email}/>}
        {user.providerData[0].providerId !== 'google.com'
            ? <button>Edit Info</button>
            : <div className={s.linkEditProfile}>
                <a href={"https://myaccount.google.com/personal-info"}
                   target={"_blank"}>Visit Google to edit information</a>
            </div>}
    </div>
};


export default Profile;