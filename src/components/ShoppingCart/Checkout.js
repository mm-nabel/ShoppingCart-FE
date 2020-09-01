import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Billing from "./Billing";
import Payment from "./Payment";
import http from "./../../services/httpService";

const scEndpoint = "http://localhost:8090/cartLine/api/v1/";

function Checkout() {
  const selector = useSelector((state) => state);
  const [productList, setProductList] = useState([]);
  const [user, setUser] = useState({});
  const id = selector.userId;

  useEffect(() => {
    http
      .get(scEndpoint + "getCartItems/", {
        headers: http.getJWT(),
      })
      .then(
        (res) => {
          let data = res === undefined ? [] : res.data.cartLineUiList;
          setProductList(data);
        },
        (error) => {
          console.log(error.response.status);
        }
      );

    http
      .get("http://localhost:8090/enduser/" + id, {
        headers: http.getJWT(),
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  let subTotal = 0;

  for (let prod of productList) {
    subTotal += prod.price * prod.quantity;
  }

  return (
    <div className="container mt20">
      <div className="row">
        <div className="col-md-4 order-md-2">
          <Payment productList={productList} subTotal={subTotal} />
        </div>
        <div className="col-md-8 order-md-1">
          <Billing
            user={user}
            productList={productList}
            totalPrice={subTotal}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
