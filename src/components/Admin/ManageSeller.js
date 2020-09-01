import React, { useRef, useState, useEffect } from "react";
import http from "./../../services/httpService";
import Popup from "reactjs-popup";

const apiEndPoint = "http://localhost:8090/administrator/seller";

function ManageSeller() {
  const [data, setData] = useState([]);
  //addnew form
  const formName = useRef(null);
  const formUsername = useRef(null);
  const formEmail = useRef(null);
  const formPassword = useRef(null);

  //update form
  const updateName = useRef(null);
  const updateUsername = useRef(null);
  const updateEmail = useRef(null);
  const updatePassword = useRef(null);
  const updateStatus = useRef(null);

  let updateItem = (index) => {
    let copyData = data.slice();
    let item = copyData[index];

    let name = updateName.current.value;
    let email = updateEmail.current.value;
    let username = updateUsername.current.value;
    let password = updatePassword.current.value;
    let status = updateStatus.current.value;

    item.username = username;
    item.email = email;
    item.name = name;
    item.password = password;
    item.status = status;

    let body = {
      id: item.id,
      name: name,
      username: username,
      email: email,
      password: password,
      status: status,
    };

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
    let name = formName.current.value;
    let email = formEmail.current.value;
    let username = formUsername.current.value;
    let password = formPassword.current.value;

    formName.current.value = "";
    formEmail.current.value = "";
    formUsername.current.value = "";
    formPassword.current.value = "";

    let body = {
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
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    http
      .get(apiEndPoint, {
        headers: http.getJWT(),
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        } else {
          alert("Please check your data and Try again");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(data);
  return (
    <div>
      <h5>Create new Seller</h5>
      <hr />
      <form onSubmit={addNew}>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              required
              ref={formName}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              required
              ref={formEmail}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              required
              ref={formUsername}
            />
          </div>
          <div className="col-md-5">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              ref={formPassword}
            />
          </div>
          <button className="btn btn-primary manageNew" type="submit">
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
                <div className="py-2 text-uppercase">Username</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Name</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Email</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Status</div>
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
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.status.toString() === "true"
                      ? "Active"
                      : "Not Active"}
                  </td>
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
                        <div className="m-10">
                          <div className="row">
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                required
                                ref={updateName}
                                defaultValue={item.name}
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email address"
                                required
                                ref={updateEmail}
                                defaultValue={item.email}
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                required
                                ref={updateUsername}
                                defaultValue={item.username}
                              />
                            </div>
                            <div className="col-md-4">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                ref={updatePassword}
                                defaultValue={item.password}
                              />
                            </div>
                            <div className="col-md-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Password"
                                required
                                ref={updateStatus}
                                defaultValue={item.status}
                              />
                            </div>
                            <div className="col-md-2">
                              <button
                                className="btn btn-primary manageNew"
                                type="submit"
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
              ))
            ) : (
              <tr>
                <td>"No sellers "</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageSeller;
