import React, { useEffect, useState, useRef } from "react";
import http from "./../../services/httpService";
import Popup from "reactjs-popup";

const apiEndPoint = "http://localhost:8090/administrator/brandowner";
const apiEndPoint1 = "http://localhost:8090/administrator/brand";

function ManageOwner() {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState([]);

  //create brandowner
  const formBrand = useRef(null);
  const formName = useRef(null);
  const formUsername = useRef(null);
  const formEmail = useRef(null);
  const formPassword = useRef(null);

  //update owner
  const updateBrand = useRef(null);
  const updateName = useRef(null);
  const updateUsername = useRef(null);
  const updateEmail = useRef(null);
  const updatePassword = useRef(null);

  let updateItem = (index) => {
    let copyData = data.slice();
    let item = copyData[index];

    let name = updateName.current.value;
    let email = updateEmail.current.value;
    let username = updateUsername.current.value;
    let password = updatePassword.current.value;
    let brandy = updateBrand.current.value;

    item.name = name;
    item.email = email;
    item.username = username;

    let body = {
      brand: brand[brandy],
      id: item.id,
      name: name,
      username: username,
      email: email,
      password: password,
    };

    // console.log(body);
    http.put(apiEndPoint, body, {
      headers: http.getJWT(),
    });

    setData(copyData);
  };

  let deleteItem = (id) => {
    let copyData = data.slice();
    // console.log(copyData);
    http.delete(apiEndPoint + "/" + id, {
      headers: http.getJWT(),
    });

    copyData = copyData.filter((data) => data.id !== id);
    setData(copyData);
  };

  let addNew = (e) => {
    e.preventDefault();
    let brandID = formBrand.current.value;

    let selectedBrand = brand[brandID];

    let name = formName.current.value;
    let email = formEmail.current.value;
    let username = formUsername.current.value;
    let password = formPassword.current.value;

    formName.current.value = "";
    formEmail.current.value = "";
    formUsername.current.value = "";
    formPassword.current.value = "";

    let body = {
      brand: selectedBrand,
      name: name,
      username: username,
      email: email,
      password: password,
    };

    // console.log(body);

    http
      .post(apiEndPoint, body, {
        headers: http.getJWT(),
      })
      .then((res) => {
        setData(data.concat(res.data));
        alert(res.data.username + " successfully added.");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    http
      .get(apiEndPoint, {
        headers: http.getJWT(),
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));

    http
      .get(apiEndPoint1, {
        headers: http.getJWT(),
      })
      .then((res) => {
        setBrand(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h5>Create new Brand Owner</h5>
      <hr />
      <form onSubmit={addNew}>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
              ref={formName}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              ref={formEmail}
            />
          </div>
          <div className="col-md-4">
            <select className="custom-select mr-sm-2" ref={formBrand}>
              {brand.map((b, index) => (
                <option value={index} key={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              required
              ref={formUsername}
            />
          </div>
          <div className="col-md-4">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              required
              ref={formPassword}
            />
          </div>
          <button type="submit" className="btn btn-primary manageNew">
            Add new
          </button>
        </div>
      </form>

      <div className="table-responsive mt20">
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="p-2 px-3 text-uppercase"></div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Name</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Username</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Email</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Brand</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Edit</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Delete</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.brand.name}</td>
                <td>
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
                      <div>
                        <div className="row">
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              required
                              ref={updateName}
                              defaultValue={item.name}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              required
                              ref={updateEmail}
                              defaultValue={item.email}
                            />
                          </div>
                          <div className="col-md-4">
                            <select
                              className="custom-select mr-sm-2"
                              ref={updateBrand}
                            >
                              {brand.map((b, index) => (
                                <option value={index} key={b.id}>
                                  {b.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="username"
                              required
                              ref={updateUsername}
                              defaultValue={item.username}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="password"
                              required
                              ref={updatePassword}
                              defaultValue={item.password}
                            />
                          </div>
                          <div className="col-md-2">
                            <button
                              type="submit"
                              className="btn btn-primary manageNew"
                              onClick={() => {
                                updateItem(index);
                                close();
                              }}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>
                </td>
                <td>
                  <button
                    className="text-dark"
                    onClick={() => deleteItem(item.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOwner;
