import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const username = useFormInput("");
  const password = useFormInput("");
  const history = useHistory();
  // const [error, setError] = useState(null);
  const [type, setType] = useState("customer");
  const [url, setUrl] = useState("http://localhost:8090/enduserlogin");

  let userTypeSelection = (event) => {
    let selected = event.target.value;
    switch (selected) {
      case "admin":
        setUrl("http://localhost:8090/adminlogin");
        setType("admin");
        break;
      case "seller":
        setUrl("http://localhost:8090/sellerlogin");
        setType("seller");
        break;
      case "owner":
        setUrl("http://localhost:8090/bologin");
        setType("owner");
        break;
      default:
        setUrl("http://localhost:8090/enduserlogin");
        setType("customer");
    }
  };

  const handleLogin = () => {
    if (password.value.length > 2 && username.value.length > 0) {
      fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          password: password.value,
          username: username.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const responseJWT = jwt(res.jwt);
          // console.log(responseJWT);
          // console.log(res);
          // const userID = responseJWT.id;
          const username = responseJWT.sub;
          const expireDate = responseJWT.exp;

          dispatch({ type: "SET_USER", value: username });
          dispatch({ type: "SET_EXPIRATION", value: expireDate });
          dispatch({ type: "SET_USER_TYPE", payload: type });
          localStorage.setItem("shopJWT", res.jwt);
          
          switch (type) {
            case "admin":
              history.push("/admin");
              break;
            case "seller":
              history.push("/seller");
              break;
            case "owner":
              history.push("bowner");
              break;
            default:
              history.push("/");
          }
        })
        .catch((err) => {
          alert("Invalid username and password. Please try again");
        });
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="logo">
          <Link to="/">
            <img src="/img/logo.png" alt="logo"></img>
          </Link>
        </div>
        <div className="signin">
          <div className="title">Sign-In</div>
          <div>
            <input
              type="text"
              className="usernameInput"
              name="username"
              {...username}
              id="username"
              placeholder="Username"
              autoComplete="username"
            />
          </div>
          <div>
            <input
              type="password"
              className="passwordInput"
              {...password}
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>
          <div>
            <select onChange={userTypeSelection}>
              <option value="customer" defaultValue>
                Customer
              </option>
              <option value="seller">Seller</option>
              <option value="owner">Brand Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="signButton">
            <div className="loginButton" onClick={handleLogin}>
              Login
            </div>
            <Link to="/register" className="goregister">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
