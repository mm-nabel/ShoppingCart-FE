import React, { useEffect, useState, useRef } from "react";
import http from "./../../services/httpService";
import Popup from "reactjs-popup";

const apiEndPoint = "http://localhost:8090/administrator/category/";

function ManageCategory() {
  const [data, setData] = useState([]);

  const nameUpdate = useRef(null);
  const nameCreate = useRef(null);

  let updateItem = (index) => {
    let copyData = data.slice();
    let item = copyData[index];

    item.name = nameUpdate.current.value;

    let body = {
      categoryId: item.categoryId,
      name: item.name,
    };

    http.put(apiEndPoint, body, {
      headers: http.getJWT(),
    });

    setData(copyData);
  };

  let deleteItem = (id) => {
    let copyData = data.slice();
    http.delete(apiEndPoint + id, {
      headers: http.getJWT(),
    });
    copyData = copyData.filter((data) => data.categoryId !== id);
    setData(copyData);
  };

  let addNew = (e) => {
    e.preventDefault();

    let body = {
      name: nameCreate.current.value,
    };

    nameCreate.current.value = "";

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
      <h5>Create new Category</h5>
      <hr />
      <form onSubmit={(e) => addNew(e)}>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Category name"
              ref={nameCreate}
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
              <tr key={item.categoryId}>
                <td>{index + 1}</td>
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
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Category name"
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
                    onClick={() => deleteItem(item.categoryId)}
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

export default ManageCategory;
