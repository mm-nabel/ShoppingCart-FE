import React from "react";
import "./App.css";
// import Home from "./components/Home/Home";
// import About from "./components/About/About";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import Login from './components/Login/Login';
// import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import LoginRouter from "./components/Routing/LoginRouter";
import HomeRouter from "./components/Routing/HomeRouter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import SearchRouter from "./components/Routing/SearchRouter";
import DetailsRouter from "./components/Routing/DetailsRouter";
import ProfileRouter from "./components/Routing/ProfileRouter";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={LoginRouter}></Route>
          <Route path="/profile" component={ProfileRouter}></Route>
          <Route path="/register" component={LoginRouter}></Route>
          <Route path="/product/:id" component={DetailsRouter}></Route>
          <Route path="/search" component={SearchRouter}></Route>
          <Route path="/" component={HomeRouter}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
