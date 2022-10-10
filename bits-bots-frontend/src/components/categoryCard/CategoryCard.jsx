import React from "react";
import { Link } from "react-router-dom";

import defaultCover from "../../assets/img/No Cover Available.png";

const CategoryCard = (product) => {
  const { name, cover, id, price } = product.product;
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="item_single_area card-element">
        <div className="item_singe_img">
          <img
            src={cover || defaultCover}
            alt="images"
            style={{ height: "100%" }}
          />
        </div>
        <div className="item_single_text">
          <h4>{name}</h4>
          <p>$ {price}.00</p>
          <Link to={`/product-detail/${id}`}>Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
