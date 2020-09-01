import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CardItem from "./CartItem";
import "./ShoppingCart.css";
import http from "./../../services/httpService";
import { useHistory } from "react-router-dom";

const apiEndpoint = "http://localhost:8090/cartLine/api/v1/";

function ShoppingCart() {
  const [productList, setProductList] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    http
      .get(apiEndpoint + "getCartItems/", {
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
  }, []);

  let subTotal = 0;

  for (let prod of productList) {
    subTotal += prod.price * prod.quantity;
  }

  let editQuantity = (id, action) => {
    let copyArr = productList.slice();
    function editFunc() {
      http.put(
        apiEndpoint + "edit",
        {
          productId: copyArr[id].productId,
          // userId: userId,
          quantity: copyArr[id].quantity,
        },
        {
          headers: http.getJWT(),
        }
      );
    }

    if (action === "add") {
      copyArr[id].quantity += 1;
      dispatch({ type: "ADD_CART", payload: 1 });
      editFunc();
    } else {
      if (copyArr[id].quantity > 1) {
        copyArr[id].quantity -= 1;
        dispatch({ type: "DELETE_CART", payload: 1 });
        editFunc();
      } else {
        dispatch({ type: "DELETE_CART", payload: copyArr[id].quantity });
        http.delete(apiEndpoint + "delete", {
          headers: http.getJWT(),
          data: {
            productId: copyArr[id].productId,
            // userId: userId,
          },
        });
        copyArr = copyArr.filter((i, index) => index !== id);
      }
    }

    setProductList(copyArr);
  };

  let deleteItem = (id) => {
    let copyArr = productList.slice();
    http.delete(apiEndpoint + "delete", {
      headers: http.getJWT(),
      data: {
        productId: copyArr[id].productId,
      },
    });
    copyArr = copyArr.filter((i, index) => index !== id);
    setProductList(copyArr);
  };

  let functions = {
    editQty: editQuantity,
    deleteItem: deleteItem,
  };

  let proceedCheckout = () => {
    history.push("/checkout");
  };

  let continueShopping = () => {
    history.push("/");
  };

  return (
    <div className="container mt20">
      <h4 className="cartTitle"> Your cart </h4>
      <button
        className="cartContinueShop btn btn-primary"
        onClick={continueShopping}
      >
        Continue Shopping
      </button>
      <hr />

      {productList.length > 0 ? (
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive ">
              <table className="table">
                <thead>
                  <tr>
                    <th className="border-0 bg-light">
                      <div className="p-2 px-3 text-uppercase">Product</div>
                    </th>
                    <th className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Price</div>
                    </th>
                    <th className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Quantity</div>
                    </th>
                    <th className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Total</div>
                    </th>
                    <th className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Remove</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((item, index) => (
                    <CardItem
                      key={index}
                      index={index}
                      item={item}
                      fx={functions}
                    ></CardItem>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
              Order summary
            </div>
            <div className="p-4">
              <ul className="list-unstyled mb-4">
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Order Subtotal </strong>
                  <strong>${subTotal}</strong>
                </li>
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Shipping and handling</strong>
                  <strong>FREE</strong>
                </li>
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Tax</strong>
                  <strong>FREE</strong>
                </li>
                <li className="d-flex justify-content-between py-3 border-bottom">
                  <strong className="text-muted">Total</strong>
                  <h5 className="font-weight-bold">${subTotal}</h5>
                </li>
              </ul>
              <button
                className="btn btn-primary rounded-pill py-2 btn-block"
                onClick={proceedCheckout}
              >
                Procceed to checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Your Shopping cart is empty</p>
      )}
    </div>
  );
}

export default ShoppingCart;
