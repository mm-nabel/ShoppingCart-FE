import React, { useEffect, useState, useRef } from "react";
import http from "./../../services/httpService";
import SellerPayment from "./SellerPayment";
import Popup from "reactjs-popup";

const apiEndPoint = "http://localhost:8090/seller/";
const brandApi = "http://localhost:8090/administrator/brand";
const categoryApi = "http://localhost:8090/administrator/category/";

function Seller() {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [seller, setSeller] = useState({});
  const [active, setActive] = useState(false);
  const [stock, setStock] = useState([]);

  const formBrand = useRef(null);
  const formCategory = useRef(null);
  const formName = useRef(null);
  const formImage = useRef(null);
  const formPrice = useRef(null);
  const formDesc = useRef(null);

  const codeUpdate = useRef(null);

  let addNew = (e) => {
    e.preventDefault();
    readStock();
    let name = formName.current.value;
    let image = formImage.current.value;
    let price = formPrice.current.value;
    let desc = formDesc.current.value;
    let selectedBrand = brand[formBrand.current.value];
    let selectedCategory = category[formCategory.current.value];

    formName.current.value = "";
    formImage.current.value = "";
    formDesc.current.value = "";
    formPrice.current.value = "";

    let body = {
      brand: selectedBrand,
      category: selectedCategory,
      description: desc,
      imageLink: image,
      name: name,
      price: price,
      seller: seller,
    };

    http
      .post(apiEndPoint + "product/", body, {
        headers: http.getJWT(),
      })
      .then((res) => {
        if (res.hasOwnProperty("data")) {
          let newProducts = products.concat(res.data);
          setProducts(newProducts);
        } else {
          alert("Check you information !");
        }
      })
      .catch((err) => console.log(err));
  };

  let deleteItem = (id) => {
    let copyData = products.slice();
    // console.log(copyData, id);
    http.delete(apiEndPoint + "product/" + id, {
      headers: http.getJWT(),
    });

    copyData = copyData.filter((data) => data.productID !== id);
    setProducts(copyData);
  };

  useEffect(() => {
    readStock();

    http
      .get(apiEndPoint + "getProducts", {
        headers: http.getJWT(),
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        }
      })
      .catch((err) => console.log(err));

    http
      .get(brandApi, {
        headers: http.getJWT(),
      })
      .then((res) => {
        setBrand(res.data);
      })
      .catch((err) => console.log(err));

    http
      .get(categoryApi, {
        headers: http.getJWT(),
      })
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));

    http
      .get(apiEndPoint, {
        headers: http.getJWT(),
      })
      .then((res) => {
        if (res.data.status) setActive(true);
        setSeller(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let downloadReport = (type) => {
    let url = "";
    switch (type) {
      case 1:
        url = "http://localhost:8090/reports/product?format=pdf";
        break;
      case 2:
        url =
          "http://localhost:8090/reports/stock/" +
          seller.id +
          "?sellerName=" +
          seller.name;
        break;
      default:
        url = "";
    }

    http
      .get(url, {
        headers: http.getJWT(),
        Accept: "application/pdf",
      })
      .then((res) => {
        window.open(res.config.url, "_self");
      })
      .catch((err) => console.log(err));
  };

  let readStock = () => {
    let data = "";
    let url = "http://localhost:8090/stock/api/v1/";
    http
      .get(url, {
        headers: http.getJWT(),
        Accept: "application/pdf",
      })
      .then((res) => {
        setStock(res.data);
      })
      .catch((err) => console.log(err));
    return data;
  };

  let updateStock = (id) => {
    let copyStock = stock.slice();
    console.log(copyStock);
    let item = copyStock.filter((p) => p.product.productID === id)[0];
    console.log(item);
    item.quantity = codeUpdate.current.value;

    let url = "http://localhost:8090/stock/api/v1/";

    http
      .put(url, item, {
        headers: http.getJWT(),
      })
      .then((res) => {
        readStock();
      })
      .catch((err) => console.log(err));
  };

  console.log(stock);
  return (
    <div className="container">
      {active ? (
        <>
          <h5 className="m25">Create new Product</h5>
          <div className="row">
            <div className="col-md-9">
              <form onSubmit={addNew}>
                <div className="form-group row">
                  <label className="col-sm-1 col-form-label">Name: </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product name"
                      ref={formName}
                      required
                    />
                  </div>
                  <label className="col-sm-2 col-form-label">
                    Image Link:{" "}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Image URL"
                      ref={formImage}
                      required
                    />
                  </div>
                  <div className="col-md-4"></div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-sm-1 col-form-label">Brand: </label>
                  <div className="col-sm-3">
                    <select className="custom-select mr-sm-2" ref={formBrand}>
                      {brand.map((b, index) => (
                        <option value={index} key={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="col-md-2 col-form-label">Category: </label>
                  <div className="col-sm-3">
                    <select
                      className="custom-select mr-sm-2"
                      ref={formCategory}
                    >
                      {category.map((b, index) => (
                        <option value={index} key={b.categoryId}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="col-sm-1 col-form-label">Price: </label>
                  <div className="col-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      ref={formPrice}
                      required
                      pattern="\d*"
                      title="Use only numbers"
                    />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-sm-2 col-form-label">
                    Description:{" "}
                  </label>
                  <div className="col-md-10">
                    <textarea
                      className="form-control"
                      rows="2"
                      ref={formDesc}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <button
                    className="btn btn-primary input-block-level form-control"
                    type="submit"
                  >
                    Add product
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <div>
                <button
                  className="btn btn-primary input-block-level form-control"
                  onClick={() => downloadReport(1)}
                >
                  Product Report
                </button>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-primary input-block-level form-control"
                  onClick={() => downloadReport(2)}
                >
                  Stock Report
                </button>
              </div>
            </div>
          </div>
          <div className="m25"></div>
          <div className="row">
            <div className="table-responsive mt20">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <div className="p-2 px-3 text-uppercase"></div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Product name</div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Description</div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Price</div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Category</div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Brand</div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Stock</div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Delete</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={item.productID}>
                      <td>
                        <img
                          src={item.imageLink}
                          alt={item.name}
                          width="50px"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.category.name}</td>
                      <td>{item.brand.name}</td>
                      <td>
                        {item.status ? (
                          <>
                            <span>
                              {
                                stock.filter(
                                  (p) => p.product.productID === item.productID
                                )[0].quantity
                              }{" "}
                              in stock{" "}
                            </span>
                            <Popup
                              trigger={
                                <button className="text-dark">
                                  <i className="fa fa-pen"></i>
                                </button>
                              }
                              modal
                              closeOnDocumentClick
                            >
                              {(close) => (
                                <div className="row p-10 mt-2">
                                  <div className="col-md-4">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Brand code"
                                      defaultValue={
                                        stock.filter(
                                          (p) =>
                                            p.product.productID ===
                                            item.productID
                                        )[0].quantity
                                      }
                                      ref={codeUpdate}
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <button
                                      className="btn btn-primary manageNew"
                                      onClick={() => {
                                        updateStock(item.productID);
                                        close();
                                      }}
                                    >
                                      Add to Stock
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Popup>
                          </>
                        ) : (
                          "Not Approved"
                        )}
                      </td>
                      <td>
                        <button
                          className="text-dark"
                          onClick={() => deleteItem(item.productID)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>{" "}
        </>
      ) : (
        <SellerPayment fx={setActive} sellerId={seller.id} />
      )}
    </div>
  );
}

export default Seller;
