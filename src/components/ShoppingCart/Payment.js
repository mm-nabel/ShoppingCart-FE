import React from "react";

function Payment(props) {
  const { productList, subTotal } = props;
  return (
    <>
      <h4 className="d-flex justify-content-between ">
        <span className="text-muted">Your cart</span>
        <span className="badge badge-secondary badge-pill">
          {productList.length}
        </span>
      </h4>
      <hr className="mb-3"></hr>
      <ul className="list-group mb-3">
        {productList.length > 0 ? (
          productList.map((p) => (
            <li
              className="list-group-item d-flex justify-content-between lh-condensed"
              key={p.productId}
            >
              <div>
                <h6 className="my-0">{p.productName}</h6>
                <small className="text-muted">{p.categoryName}</small>
              </div>
              <span className="text-muted">
                ${p.price} * {p.quantity}
              </span>
            </li>
          ))
        ) : (
          <p>No products</p>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>${subTotal}</strong>
        </li>
      </ul>
    </>
  );
}

export default Payment;
