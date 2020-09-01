import React, { useState, useEffect } from "react";
import http from "./../../services/httpService";
import { Link } from "react-router-dom";

const apiEndPoint = "http://localhost:8090/enduser/";
function Profile() {
  useEffect(() => {
    http
      .get(apiEndPoint + 2, {
        headers: http.getJWT(),
      })
      .then(
        (res) => {
          let data = res === undefined ? "{}" : res.data;
          console.log(data);
        },
        (error) => {
          console.log(error.response.status);
        }
      );
  }, []);

  let changeLink = (link) => {
    if (link === 1) setToggle(true);
    else setToggle(false);
  };
  const [toggle, setToggle] = useState(true);
  let listLinkClass = "list-group-item list-group-item-action";

  return (
    <div className="container">
      <div className="row m25">
        <div className="col-md-3">
          <div className="list-group">
            <Link
              to="#"
              className={listLinkClass + (toggle ? " active" : "")}
              onClick={() => changeLink(1)}
            >
              Basic informations
            </Link>
            <Link
              to="#"
              className={listLinkClass + (toggle ? "" : " active")}
              onClick={() => changeLink(2)}
            >
              Address details
            </Link>
          </div>
        </div>
        {toggle ? (
          <div className="col-md-9">User details</div>
        ) : (
          <div className="col-md-9">Address details</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
