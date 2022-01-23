import React from "react";
import { Navigate } from "react-router-dom";
import Dashboard from './../components/Admin/Dashboard';
import AdminMatches from './../components/Admin/matches/index';
import AddEditMatch from './../components/Admin/matches/AddEditMatch';
import AdminPlayers from './../components/Admin/players/index';
import AddEditPlayer from './../components/Admin/players/AddEditPlayer';

const PrivateRoutes = (props) => {

    return props.user ?
        (
            props.element === 'dashboard' ?
                <Dashboard user={props.user} />
                :
                props.element === 'admin-matches' ?
                    <AdminMatches user={props.user} />
                    :
                    props.element === 'add-match' ?
                        <AddEditMatch user={props.user} />
                        :
                        props.element === 'edit-match' ?
                            <AddEditMatch user={props.user} />
                            :
                            props.element === 'admin-players' ?
                                <AdminPlayers user={props.user} />
                                :
                                props.element === 'add-player' ?
                                    <AddEditPlayer user={props.user} />
                                    :
                                    props.element === 'edit-player' ?
                                        <AddEditPlayer user={props.user} />
                                        :
                                        null
        )
        :
        <Navigate to='/login' replace />

}

export default PrivateRoutes;