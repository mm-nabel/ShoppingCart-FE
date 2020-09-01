import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManageBrand from "./ManageBrand";
import ManageSeller from "./ManageSeller";
import ManageOwner from "./ManageOwner";
import ManageCategory from "./ManageCategory";
import "./Admin.css";

//1 - Brand
//2 - Sellers
//3 - Brand - owners

function Admin() {
  const [toggle, setToggle] = useState(1);
  let changeLink = (link) => {
    setToggle(link);
  };

  let listLinkClass = "list-group-item list-group-item-action";

  return (
    <div className="container">
      <div className="row m25">
        <div className="col-md-9">
          {toggle === 1 && <ManageBrand />}
          {toggle === 2 && <ManageSeller />}
          {toggle === 3 && <ManageOwner />}
          {toggle === 4 && <ManageCategory />}
        </div>
        <div className="col-md-3">
          <div className="list-group">
            <Link
              to="#"
              className={listLinkClass + (toggle === 1 ? " active" : "")}
              onClick={() => changeLink(1)}
            >
              Manage Brands
            </Link>
            <Link
              to="#"
              className={listLinkClass + (toggle === 2 ? " active" : "")}
              onClick={() => changeLink(2)}
            >
              Manage Sellers
            </Link>
            <Link
              to="#"
              className={listLinkClass + (toggle === 3 ? " active" : "")}
              onClick={() => changeLink(3)}
            >
              Manage Brand-Owners
            </Link>
            <Link
              to="#"
              className={listLinkClass + (toggle === 4 ? " active" : "")}
              onClick={() => changeLink(4)}
            >
              Manage Category
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
