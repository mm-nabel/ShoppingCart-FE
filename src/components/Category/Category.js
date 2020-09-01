import React from "react";
import "./Category.css";

const Category = (props) => {
  const categoryName = props.category.name;
  const primeClass = props.addition;

  return (
    <div className="category">
      <div className={`category-field ${primeClass}`} onClick={props.fetchMe}>
        {categoryName}
      </div>
    </div>
  );
};

export default Category;
