import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductDetail from '../ProductDetail/ProductDetail';
import { Route, Switch } from "react-router-dom";
const DetailsRouter = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/product/:id">
                    <ProductDetail />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default DetailsRouter;