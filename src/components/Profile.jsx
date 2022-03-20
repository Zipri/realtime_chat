import React, {useContext} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Loader from "./Loader";
import s from "./styles.module.css";
import anonymous from "../assets/anonymous.png";

const Profile = () => {
    const {firebase, auth, firestore} = useContext(Context)
    const [user, loading] = useAuthState(auth)

    if (loading) return <Loader/>
    return <div className={s.block}>
        <div className={s.inside}>
            <div className={s.myField}>
                <img src={user.photoURL ? user.photoURL : anonymous} className={s.largePhoto}/>
            </div>
            <button className={s.profileButton}>Change Avatar</button>
            <div className={s.myField}>
                <text>Login:</text>
                {user.displayName}
            </div>
            <button className={s.profileButton}>Change Login</button>
            <div className={s.myField}>
                <text>Email:</text>
                {user.email}
            </div>
        </div>
    </div>
};

export default Profile;