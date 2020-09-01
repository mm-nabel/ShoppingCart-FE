import React, { useState, useEffect } from "react";
import http from "./../../services/httpService";
// import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  // const selector = useSelector(state=>state);
  // const userType = selector.userType;
  const [profile, setProfile] = useState({
    name: "Test USer",
    address: {
      city: "Test City",
      state: "Test Ttate",
    },
  });
  const [hasAddress, setAddress] = useState(false);
  // const shopJWT = localStorage.getItem("shopJWT");
  useEffect(() => {
    http
      .get("http://localhost:8090/enduser/0", {
        headers: http.getJWT(),
      })
      .then((res) => {
        setProfile(res.data);
        console.log(res.data);
        if (res.data.address.city !== "") {
          setAddress(true);
        }
        console.log(profile);
      });
  }, []);
  return (
    <div className="user-profile">
      {setAddress ? (
        <div className="address">
          <h2>Shipping Address</h2>
          <div className="address-body">
            <div className="address-body-section">
              <div className="section-holder">
                <div className="title-section">{profile.name}</div>
                <div className="info-section">
                  <div>{profile.address.city}</div>
                  <div>{profile.address.state}</div>
                  <div>united states</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
