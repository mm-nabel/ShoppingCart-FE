import React, { useEffect, useState, useRef } from "react";
import http from "./../../services/httpService";
import Popup from "reactjs-popup";

const apiEndPoint = "http://localhost:8090/administrator/brand";

function ManageBrand() {
  const [data, setData] = useState([]);

  const codeUpdate = useRef(null);
  const nameUpdate = useRef(null);

  const brandName = useRef(null);
  const brandCode = useRef(null);

  let updateItem = (index) => {
    let copyData = data.slice();
    let item = copyData[index];
    item.name = nameUpdate.current.value;
    item.code = codeUpdate.current.value;
    let body = {
      id: item.id,
      code: item.code,
      name: item.name,
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

    let body = {
      code: brandCode.current.value,
      name: brandName.current.value,
    };

    brandCode.current.value = "";
    brandName.current.value = "";

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
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h5>Create new Brand</h5>
      <hr />
      <form onSubmit={(e) => addNew(e)}>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Brand code"
              ref={brandCode}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Brand name"
              ref={brandName}
              required
            />
          </div>
          <button className="btn btn-primary manageNew">Add new</button>
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
                <div className="py-2 text-uppercase">Code</div>
              </th>
              <th>
                <div className="py-2 text-uppercase">Name</div>
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
                <td>{item.code}</td>
                <td>{item.name}</td>
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
                      <div className="row p-10 mt-2">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Brand code"
                            defaultValue={item.code}
                            ref={codeUpdate}
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Brand name"
                            defaultValue={item.name}
                            ref={nameUpdate}
                          />
                        </div>
                        <div className="col-md-2">
                          <button
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

export default ManageBrand;
