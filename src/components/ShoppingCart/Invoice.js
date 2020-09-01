import React from "react";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";

function Invoice(props) {
  const { order, user } = props;
  // console.log(order, user);
  let print = (e) => {
    window.print();
  };

  return (
    <>
      <div className="col-md-12">
        <h5>
          Thanks for your purchase. Your order number is
          <strong> {order.orderId}</strong>
        </h5>
        <div className="card mt-3">
          <h5 className="card-header">Shipping address</h5>
          <div className="card-body">
            <h5 className="card-title">Customer name: {user.name}</h5>
            <p>City: {user.address.city}</p>
            <p>State: {user.address.state}</p>
            <p>Zipcode: {user.address.zipCode}</p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary noprint"
              onClick={(e) => print(e)}
            >
              Print
            </button>
            <Link to="/" className="btn btn-success cartContinueShop noprint">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
