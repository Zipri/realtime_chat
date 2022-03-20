import {Navigate} from "react-router-dom";
import {CHAT_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Registration from "./components/Registration";
import Profile from "./components/Profile";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
      path: REGISTRATION_ROUTE,
      Component: Registration
    },
    {
        path: "*",
        Component: Navigate,
    }
]

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: "*",
        Component: Navigate,
    }
]