import React from "react";
import "./ShoppingCart.css";

function CardItem(props) {
  const { item, index } = props;

  const { editQty, deleteItem } = props.fx;

  return (
    <tr>
      <th scope="row" className="border-0">
        <div className="p-2">
          <img
            src={item.imageLink}
            alt={item.productName}
            width="70"
            className="img-fluid rounded shadow-sm"
          />
          <div className="ml-3 d-inline-block align-middle">
            <h5 className="mb-0">
              {" "}
              <p to="#" className="text-dark d-inline-block align-middle">
                {item.productName}
              </p>
            </h5>
            <span className="text-muted font-weight-normal font-italic d-block">
              Category: {item.categoryName}
            </span>
          </div>
        </div>
      </th>
      <td className="border-0 align-middle">
        <strong>${item.price}</strong>
      </td>
      <td className="border-0 align-middle">
        <div>
          <button className="minus" onClick={() => editQty(index, "reduce")}>
            -
          </button>
          <strong>
            <p className="qty"> {item.quantity} </p>
          </strong>
          <button className="plus" onClick={() => editQty(index, "add")}>
            +
          </button>
        </div>
      </td>
      <td className="border-0 align-middle">
        <strong>${item.price * item.quantity}</strong>
      </td>
      <td className="border-0 align-middle">
        <button className="text-dark" onClick={() => deleteItem(index)}>
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default CardItem;
