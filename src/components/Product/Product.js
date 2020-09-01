import React from "react";
import "./Product.css";
import http from "./../../services/httpService";

const apiEndPoint = "http://localhost:8090/cartLine/api/v1/add";
const Product = (props) => {
  const product = props.product;
  const name = product.name;
  const description = product.description;
  const price = product.price;
  const category = product.category;
  const seller = product.sellerId;

  // let body = {
  //   productId: product.productID,
  //   quantity: 1,
  //   price: price,
  //   productDesc: product.description,
  //   productName: product.name,
  //   imageLink: product.imageLink,
  //   categoryId: category.categoryId,
  //   categoryName: category.name,
  //   sellerId: seller,
  // };

  // let addToCart = () => {
  //   console.log(body);
  //   http.post(apiEndPoint, body, {
  //     headers: http.getJWT(),
  //   });
  // };

  return (
    <div className="product">
      <div className="product-container" onClick={() => props.getOverview()}>
        <div className="product-img">
          <img src={product.imageLink} alt="img"></img>
        </div>
        <div className="product-bottom">
          <div className="product-info">
            <div className="product-title">
              <div className="ptitle">{name}</div>
            </div>
            <div className="product-price">${price}</div>
            <div className="product-description">{description}</div>
          </div>
          <div className="addtoCart">
            <div onClick={() => props.getOverview()}>
              <i className="fas fa-info-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
