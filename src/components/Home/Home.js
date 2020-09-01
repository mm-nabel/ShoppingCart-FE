import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Product from "../Product/Product";
import "./Home.css";
const Home = () => {
  const selector = useSelector((state) => state);
  const history = useHistory();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8090/products/api/v1/")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  }, []);

  const productOverview = (prodId) => {
    // dispatch({type:'SET_SEARCH', payload:searchValue});
    history.push({
      pathname: `/product/${prodId}`,
      search: "",
      state: { productId: prodId },
    });
  };
  return (
    <div className="home">
      <div className="featured">
        <div className="featured-title">
          <span className="bolder">Hi {selector.username}, </span>
          <span> treat yourself to a great deal today</span>
        </div>
      </div>
      <div className="product-list">
        {products.map((product, productId) => (
          <Product
            product={product}
            key={product.productID}
            getOverview={() => productOverview(product.productID)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
