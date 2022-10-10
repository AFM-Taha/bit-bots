import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";
import HeaderAndNavbar from "../../components/headerAndNavbar/HeaderAndNavbar";
import Pagination from "../../components/pagination/Pagination";
import ProductCard from "../../components/productCard/ProductCard";
import Spinner from "../../components/spinner/Spinner";

const Action = () => {
  const { isLoading, products, error } = useSelector((state) => state.products);
  const currentItems = useSelector((state) => state.pagination.currentItems);

  const [genreProduct, setGenreProduct] = useState([]);

  const { genre } = useParams();

  const handleFilterByGenre = (id) => {
    const newArr = [];
    const idInNumber = parseInt(id);

    for (let i = 0; i < products.length; i++) {
      // const exists = newArr.find((item) => item.id === allGames[i].id);
      //   const checkPlatform = isPropertyMatched(products[i], id, "genres");
      const genreProductOn = products[i].genres?.find(
        (item) => item.id === idInNumber
      );

      if (genreProductOn) {
        newArr.push(products[i]);
      }
    }

    setGenreProduct(newArr);
  };

  useEffect(() => {
    if (genre && products) {
      handleFilterByGenre(genre);
    }
  }, [genre, products]);

  console.log(products);

  return (
    <>
      {isLoading || genreProduct?.length === 0 ? (
        <Spinner />
      ) : (
        <div>
          {/* Header And Navbar */}
          <HeaderAndNavbar />

          {/* Banner  */}
          <Banner />

          {/* Product Section */}
          <section className="item">
            <div className="container card-container">
              <div className="item_text card-item-container">
                {genreProduct &&
                  currentItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <Pagination products={genreProduct} />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Action;
