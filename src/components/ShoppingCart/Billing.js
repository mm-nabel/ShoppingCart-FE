import React, { useState, useRef } from "react";
import http from "./../../services/httpService";
import Invoice from "./Invoice";
const apiEndPoint = "http://localhost:8090/payment/charge/";

function Billing(props) {
  let { user, productList, totalPrice } = props;
  const [status, setStatus] = useState(false);
  const [method, setMethod] = useState(null);
  const [order, setOrder] = useState({});
  const cardName = useRef(null);
  const cardNumber = useRef(null);
  const cardCVV = useRef(null);
  const holderName = useRef(null);

  const userCity = useRef(null);
  const userState = useRef(null);
  const userZipcode = useRef(null);

  let paymentMethod = (e) => {
    setMethod(e.target.value);
  };

  let updateAddress = (e) => {
    e.preventDefault();
    let newUser = Object.assign(user);
    let city = userCity.current.value;
    let state = userState.current.value;
    let zip = userZipcode.current.value;

    newUser.address.city = city;
    newUser.address.state = state;
    newUser.address.zipCode = zip;

    http
      .put("http://localhost:8090/enduser/editProfile", newUser, {
        headers: http.getJWT(),
      })
      .then((res) => alert("Billing address successfully saved. "))
      .catch((err) => console.log(err));
  };

  let completeCheckout = (data) => {
    // console.log(data);
    http
      .post("http://localhost:8090/orders/checkout", data, {
        headers: http.getJWT(),
      })
      .then((res) => setOrder(res.data[0]))
      .catch((err) => console.log(err));
  };

  let handleCheckoutForm = (e) => {
    e.preventDefault();
    let requestBody = {
      nameOnCard: holderName.current.value,
      paymentType: method,
      cardNo: cardName.current.value,
      expiryDate: cardNumber.current.value,
      cvv: cardCVV.current.value,
    };

    let order = {
      payment: requestBody,
      shoppingCartToOrderDTO: {
        endUserId: user.id,
        shoppinCartToOrderDTOList: productList,
      },
    };

    http
      .post(apiEndPoint + totalPrice, requestBody, {
        headers: http.getJWT(),
      })
      .then((res) => {
        if (res.data === true) {
          completeCheckout(order);
        } else {
          alert("Check your payment information");
        }
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  let disable = status ? "" : "disabled";
  let success = order.hasOwnProperty("orderId") ? true : false;
  // console.log(success);
  return (
    <>
      {success === true ? (
        <Invoice order={order} user={user} />
      ) : (
        <>
          <h4>Billing address</h4>
          <form onSubmit={(e) => updateAddress(e)}>
            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label">City:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    user.hasOwnProperty("address") ? user.address.city : ""
                  }
                  placeholder="Enter your city"
                  required
                  ref={userCity}
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label">State:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    user.hasOwnProperty("address") ? user.address.state : ""
                  }
                  placeholder="Enter your state"
                  required
                  ref={userState}
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label">Zip code:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    user.hasOwnProperty("address") ? user.address.zipCode : ""
                  }
                  placeholder="Enter your Zip Code"
                  ref={userZipcode}
                  required
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block p15 mt-3"
                type="submit"
              >
                Update Billing Address
              </button>
            </div>
          </form>

          <hr />
          <form onSubmit={handleCheckoutForm}>
            <h4 className="mb-3">Payment</h4>
            <hr className="mb-4" />
            <div className="col-md-12 mb-2">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="0"
                  onChange={paymentMethod}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  <i className="fab fa-cc-mastercard"></i>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="1"
                  onChange={paymentMethod}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  <i className="fab fa-cc-visa"></i>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="2"
                  onChange={paymentMethod}
                  required
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  <i className="fab fa-cc-amex"></i>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder=""
                  required
                  ref={holderName}
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">Name on card is required</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder=""
                  required
                  ref={cardName}
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required
                  ref={cardNumber}
                />
                <div className="invalid-feedback">Expiration date required</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required
                  ref={cardCVV}
                />
                <div className="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr className="mb-4"></hr>

            <div className="col-md-12">
              <button
                className="btn btn-primary btn-lg btn-block p15"
                type="submit"
              >
                Continue to checkout
              </button>
            </div>
          </form>
        </>
      )}{" "}
    </>
  );
}

export default Billing;
