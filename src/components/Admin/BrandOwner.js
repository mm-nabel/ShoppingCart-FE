import React, { useEffect, useState } from "react";
import http from "./../../services/httpService";
// import Popup from "reactjs-popup";

const apiEndPoint = "http://localhost:8090/brandowner/";

function BrandOwner() {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);

  let approveItem = (index, decision) => {
    let copyData;

    if (decision) {
      copyData = pending.slice();
    } else {
      copyData = approved.slice();
    }

    let product = copyData[index];
    product.status = 1;
    copyData = copyData.filter((p) => p.productID !== product.productID);

    http
      .post(apiEndPoint + "reviewproduct/" + decision, product, {
        headers: http.getJWT(),
      })
      .then((res) => {
        if (res.data !== null) {
          if (decision) {
            setPending(copyData);
            setApproved(approved.concat(product));
          } else {
            setApproved(copyData);
            setPending(approved.concat(product));
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //approved
    http
      .get(apiEndPoint + "getAllApprovedProducts", {
        headers: http.getJWT(),
      })
      .then((res) => {
        setApproved(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));

    //pending
    http
      .get(apiEndPoint + "getAllPendingApproval", {
        headers: http.getJWT(),
      })
      .then((res) => {
        setPending(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(approved, pending);

  return (
    <div className="container">
      <div className="row">
        <h4 className="mt-5">Pending Products - {pending.length}</h4>
        <div className="col-md-12">
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
                      <div className="py-2 text-uppercase">Status</div>
                    </th>
                    <th>
                      <div className="py-2 text-uppercase">Approve</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pending.length > 0 ? (
                    pending.map((item, index) => (
                      <tr key={item.productID}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.category.name}</td>
                        <td>{item.brand.name}</td>
                        <td>{item.status ? "Approved" : "Not Approved"}</td>
                        <td>
                          <button
                            className="text-dark"
                            onClick={() => approveItem(index, true)}
                          >
                            <i
                              className="fa fa-check-circle"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No products</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h4 className="mt-5">Approved Products - {approved.length}</h4>
        <div className="col-md-12">
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
                      <div className="py-2 text-uppercase">Status</div>
                    </th>
                    {/* <th>
                      <div className="py-2 text-uppercase">Decline</div>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {approved.map((item, index) => (
                    <tr key={item.productID}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.category.name}</td>
                      <td>{item.brand.name}</td>
                      <td>{item.status ? "Approved" : "Not Approved"}</td>
                      {/* <td>
                        <button
                          className="text-dark"
                          onClick={() => approveItem(index, false)}
                        >
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandOwner;
