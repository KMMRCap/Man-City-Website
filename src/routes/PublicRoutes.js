import React from "react";
import { Navigate } from "react-router-dom";
import Home from './../components/Home';
import Login from './../components/Auth';
import TheTeam from './../components/TheTeam';
import Matches from './../components/Matches';
import NotFound from './../components/NotFound';

const PublicRoutes = ({ user, element, restricted }) => {
    return restricted ?
        (user ?
            <Navigate to='/dashboard' replace />
            :
            (element === 'home' ?
                <Home user={user} />
                :
                element === 'login' ?
                    <Login user={user} />
                    :
                    element === 'the-team' ?
                        <TheTeam user={user} />
                        :
                        element === 'matches' ?
                            <Matches user={user} />
                            :
                            element === 'not-found' ?
                            <NotFound user={user} />
                            :
                            null
            )
        )
        :
        (element === 'home' ?
            <Home user={user} />
            :
            element === 'login' ?
                <Login user={user} />
                :
                element === 'the-team' ?
                    <TheTeam user={user} />
                    :
                    element === 'matches' ?
                        <Matches user={user} />
                        :
                        element === 'not-found' ?
                            <NotFound user={user} />
                            :
                            null
        )
}

export default PublicRoutes;