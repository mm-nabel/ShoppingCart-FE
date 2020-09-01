import React from "react";
import Home from "../Home/Home";
import About from "../About/About";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { Route, Switch } from "react-router-dom";
import Checkout from "../ShoppingCart/Checkout";
import Profile from "../User/Profile";
import Admin from "../Admin/Admin";
import BrandOwner from "../Admin/BrandOwner";
import Seller from "../Admin/Seller";

const HomeRouter = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/cart">
          <ShoppingCart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/bowner">
          <BrandOwner />
        </Route>
        <Route path="/seller">
          <Seller />
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
};

export default HomeRouter;
