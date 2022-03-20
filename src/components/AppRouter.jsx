import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";

import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return user
        ? (
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                    {
                        if (path === "*") {
                            return <Route key={path} path={path} element={<Component to={CHAT_ROUTE}/>}/>
                        }
                        return <Route key={path} path={path} element={<Component/>}/>
                    }
                )}
            </Routes>
        )
        : (
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    {
                        if (path === "*") {
                            return <Route key={path} path={path} element={<Component to={LOGIN_ROUTE}/>}/>
                        }
                        return <Route key={path} path={path} element={<Component/>}/>
                    }
                )}
            </Routes>
        )
};

export default AppRouter;