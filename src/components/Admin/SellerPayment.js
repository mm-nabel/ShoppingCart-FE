import React, { useState, useRef } from "react";
import http from "./../../services/httpService";

const apiEndPoint = "http://localhost:8090/payment/charge/100";
const sellerEndPoint = "http://localhost:8090/administrator/seller/";

function SellerPayment(props) {
  const { fx, sellerId } = props;
  const [method, setMethod] = useState(null);

  const cardName = useRef(null);
  const cardNumber = useRef(null);
  const cardCVV = useRef(null);
  const holderName = useRef(null);

  let paymentMethod = (e) => {
    setMethod(e.target.value);
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

    let processPayment = () => {
      let status = true;

      http
        .get(sellerEndPoint + sellerId + "/endpoint/" + status, {
          headers: http.getJWT(),
        })
        .then((res) => fx(true))
        .catch((err) => console.log(err));
      fx(true);
    };

    http
      .post(apiEndPoint, requestBody, {
        headers: http.getJWT(),
      })
      .then((res) => {
        if (res.data === true) {
          alert("Your payment completed");
          processPayment();
        } else {
          alert("Check your payment information");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h4 className="mt-5">
        You need to active your account. Activation fee is 100$
      </h4>
      <hr />
      <form onSubmit={handleCheckoutForm}>
        <h5 className="mb-3">Enter your payment information</h5>
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
            <small className="text-muted">Full name as displayed on card</small>
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
  );
}

export default SellerPayment;
