import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Hoc/Layout";
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

const App = (props) => {

    return (
        <Layout user={props.user}>
            <Routes>
                <Route exact index
                    path='/'
                    element={<PublicRoutes user={props.user} element='home' restricted={false} />}
                />
                <Route exact
                    path='/login'
                    element={<PublicRoutes user={props.user} element='login' restricted={true} />}
                />
                <Route exact
                    path='/the-team'
                    element={<PublicRoutes user={props.user} element='the-team' restricted={false} />}
                />
                <Route exact
                    path='/matches'
                    element={<PublicRoutes user={props.user} element='matches' restricted={false} />}
                />
                <Route exact
                    path='/dashboard'
                    element={<PrivateRoutes user={props.user} element='dashboard' />}
                />
                <Route exact
                    path='/admin-matches'
                    element={<PrivateRoutes user={props.user} element='admin-matches' />}
                />
                <Route exact
                    path='/admin-matches/add-match'
                    element={<PrivateRoutes user={props.user} element='add-match' />}
                />
                <Route exact
                    path='/admin-matches/edit-match/:id'
                    element={<PrivateRoutes user={props.user} element='edit-match' />}
                />
                <Route exact
                    path='/admin-players'
                    element={<PrivateRoutes user={props.user} element='admin-players' />}
                />
                <Route exact
                    path='/admin-players/add-player'
                    element={<PrivateRoutes user={props.user} element='add-player' />}
                />
                <Route exact
                    path='/admin-players/edit-player/:id'
                    element={<PrivateRoutes user={props.user} element='edit-player' />}
                />
                <Route
                    path='*'
                    element={<PublicRoutes user={props.user} element='not-found' restricted={false} />}
                />
            </Routes>
        </Layout>
    );
}

export default App;