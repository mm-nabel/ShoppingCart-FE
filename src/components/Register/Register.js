import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  // const [data, setData] = useState({});
  // const [auth, setAuth] = useState(false);
  // const [passAuth, setPassAuth] = useState(false);

  const checkAuth = () => {
    // console.log(passwordRef.current.value, repasswordRef.current.value);
    // if(passwordRef.current.value.toString() === repasswordRef.current.value.toString()) {
    //     setPassAuth(true);
    // }
    // if(passAuth) {
    // setData({
    //     email: emailRef.current.value,
    //     name: nameRef.current.value,
    //     username: usernameRef.current.value,
    //     password: passwordRef.current.value
    // });
    // console.log(data);
    // console.log(auth);
    // setAuth(true);
    // console.log(auth);
    // }
  };

  const submitReg = () => {
    // console.log("ASD : " + auth);
    // checkAuth();
    // if (auth) {
    let data = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    fetch("http://localhost:8090/enduser/signup", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch({ type: "SET_USER_ID", payload: res.id });
        dispatch({ type: "SET_USER", value: usernameRef.current.value });
        history.push("/login");
      });
    // }
    // else {
    //     alert("ERRORRRR");
    // }
  };

  let backToLogin = () => {
    history.push("/login");
  };
  return (
    <div className="register">
      <div className="registerContainer">
        <div className="logo">
          <Link to="/">
            <img src="/img/logo.png"></img>
          </Link>
        </div>
        <div className="regis">
          <div className="title">Create Account</div>
          <div>
            <input
              type="text"
              ref={nameRef}
              className="userInput"
              name="name"
              id="yourname"
              placeholder="Your name"
            />
          </div>
          <div>
            <input
              type="text"
              ref={usernameRef}
              className="usernameInput"
              name="username"
              id="username"
              placeholder="User name"
            />
          </div>
          <div>
            <input
              type="text"
              ref={emailRef}
              className="email"
              name="username"
              id="email"
              placeholder="e-mail"
            />
          </div>
          <div>
            <input
              type="password"
              ref={passwordRef}
              className="passwordInput"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              ref={repasswordRef}
              className="repasswordInput"
              placeholder="Re-enter"
            />
          </div>
          <div className="regButton">
            <div className="reg" onClick={submitReg}>
              Create
            </div>
            <div onClick={backToLogin}>Back to Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
