import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import http from "./../../services/httpService";
import "./ProductDetail.css";

const ProductDetail = () => {
  const params = useParams();
  const [selectedQty, setSelectedQty] = useState(1);
  const [totalQty, setTotalQty] = useState(0);
  const dispatch = useDispatch();
  const [productDetails, setDetails] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const apiEndPoint = "http://localhost:8090/cartLine/api/v1/add";
  const [status, setStatus] = useState(false);

  const addToCart = () => {
    if(selectedQty === 0) {
      alert("STOCK EMPTY!");
      return;
    }
    dispatch({ type: "ADD_CART", payload: selectedQty });
    console.log("ADDED");
    const body = {
      productId: productDetails.productID,
      quantity: selectedQty,
      price: productDetails.price,
      productDesc: productDetails.description,
      productName: productDetails.name,
      imageLink: productDetails.imageLink,
      categoryId: productDetails.category.categoryId,
      categoryName: productDetails.category.name,
      sellerId: productDetails.sellerId,
    };
    console.log(body);
    http.post(apiEndPoint, body, {
      headers: http.getJWT(),
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8090/products/api/v1/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const maxQty = res.quantity < 10 ? res.quantity : 10;
        if (maxQty === 0) setSelectedQty(0);
        let qty = [];
        for (let i = 1; i <= maxQty; i++) {
          qty.push(i);
        }
        setQuantity(qty);
        setTotalQty(res.quantity);
        setDetails(res.product);
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  }, []);

  return (
    <div className="product-detail">
      <div className="product-detail-title">
        <h1>{productDetails.name}</h1>
      </div>
      <div className="product-detail-container">
        <div className="deals-section">
          <div className="product-deals">
            <div className="deals-img">
              <img height="400" src={productDetails.imageLink} alt="img"></img>
            </div>
            <div className="product-details">
              <div className="details-title">Product Details</div>
              <div className="details-det">{productDetails.description}</div>
            </div>
          </div>
        </div>
        <div className="intro-section">
          <div className="intro-deals">
            {selectedQty === 0 ? (<div></div>): (<div className = "intro-price">
              ${ productDetails.price } & FREE Shipping
            </div>)}

            {selectedQty === 0 ? (
            <div className="notAvail">
              Stock empty
            </div>

          ) : (
              <div className="availibility">
                In Stock <span>({totalQty})</span>
              </div>
            )}

          <div className="intro-quantity">
            <span>Quantity: </span>
            <select
              className="quantity"
              onChange={(e) => setSelectedQty(parseInt(e.target.value))}
            >
              {quantity.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
          <div className="intro-addToCart">
            <div onClick={() => addToCart()}> + Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
    </div >
  );
};

export default ProductDetail;
