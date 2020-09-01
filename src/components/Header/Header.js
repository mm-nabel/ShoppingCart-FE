import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.css";
import http from "./../../services/httpService";

const Header = (props) => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  let cart = selector.cart;
  const userRole = selector.userType;
  const [controllerPage, setControllerPage] = useState("");
  const apiEndpoint = "http://localhost:8090/cartLine/api/v1/";

  const handleShopping = () => {
    http
      .post(
        "http://localhost:8090/getId",
        { jwt: localStorage.getItem("shopJWT") },
        {
          headers: http.getJWT(),
        }
      )
      .then(
        (res) => {
          if (res.data) {
            dispatch({ type: "SET_USER_ID", payload: res.data });
          }
        },
        (error) => {
          console.log(error.response.status);
        }
      );
  };

  useEffect(() => {
    if (userRole !== "admin") {
      http
        .get(apiEndpoint + "getCartItems/", {
          headers: http.getJWT(),
        })
        .then(
          (res) => {
            if (res) {
              let totalData = 0;
              res.data.cartLineUiList.map((product) => {
                totalData += product.quantity;
              });
              dispatch({ type: "SET_CART", payload: totalData });
            } else {
              dispatch({ type: "SET_CART", payload: 0 });
            }
          },
          (error) => {
            console.log(error.response.status);
          }
        );
    } else {
      cart = 1;
    }

    if (userRole === "admin") setControllerPage("/admin");
    else if (userRole === "owner") setControllerPage("/bowner");
    else if (userRole === "customer") setControllerPage("/");
    else if (userRole === "seller") setControllerPage("/seller");
  }, []);

  const homeBtn = () => {
    dispatch({ type: "SET_SEARCH", payload: "" });
    dispatch({ type: "SET_CATEGORY", payload: "" });
  };

  const setLogin = () => {
    localStorage.removeItem("state");
    localStorage.removeItem("shopJWT");
  };

  return (
    <header id="masterhead" className="row noprint">
      <div className="left">
        <Link to="/">
          <img id="logo" src="/img/logo.png" alt="logo" onClick={homeBtn} />
        </Link>
        <nav id="menuVeloce">
          <ul>
            <li>
              <Link to="/">SHOP</Link>
            </li>
            {/* <li>
              <Link to="#">CATEGORIES</Link>
            </li> */}
            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}
          </ul>
        </nav>
      </div>

      {/* <div className="middle">
        <div className="hamburger close">
          <span></span>
        </div>
      </div> */}
      <div className="right">
        {/* <nav id="menuVeloceR">
          <ul>
            <li>
              <Link to="/">MENU 2</Link>
            </li>
            <li>
              <Link to="/checkout">MENU3</Link>
            </li>
          </ul>
        </nav> */}

        <Search />

        <nav id="shoppingMenu">
          <ul>
            {/* <li>
              <Link to="#" id="cerca" className=" open">
                <i className="fas fa-search"></i>
              </Link>
            </li> */}
            <li>
              {/* {serializedState === false ? 
              (<Link to="/login">
                <i className="fas fa-sign-in-alt"></i>
              </Link>) : (
              <Link to="/">
                <i className="fas fa-sign-in-alt"></i>
              </Link>)} */}
              <Link to="/login" onClick={setLogin}>
                <i className="fas fa-sign-in-alt"></i>
              </Link>
            </li>
            <li>
              <Link to={controllerPage}>
                <i className="fas fa-cogs"></i>
              </Link>
            </li>
            {selector.userType === "customer" ? (
              <li>
                <Link
                  to="/cart"
                  id="cart-button"
                  href="#"
                  onClick={handleShopping}
                >
                  <i className="fas fa-shopping-bag"></i>
                  <span> {cart}</span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
