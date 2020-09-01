import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

const SearchRouter = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/search">
                    <SearchBar />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default SearchRouter;