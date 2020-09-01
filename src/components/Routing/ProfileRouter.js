import React from 'react';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Route, Switch } from "react-router-dom";

const ProfileRouter = ()=> {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default ProfileRouter;