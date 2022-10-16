import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import HeaderAndNavbar from "../../components/headerAndNavbar/HeaderAndNavbar";
import Pagination from "../../components/pagination/Pagination";
import ProductCard from "../../components/productCard/ProductCard";
import Spinner from "../../components/spinner/Spinner";
import { initiatePagination } from "../../redux/features/pagination/paginationSlice";

const SearchResult = () => {
  const { isLoading, products, error } = useSelector((state) => state.products);
  const currentItems = useSelector((state) => state.pagination.currentItems);

  const [searchedItems, setSearchedItem] = useState([]);

  const dispatch = useDispatch();

  const { searchText } = useParams();

  useEffect(() => {
    dispatch(initiatePagination({ products: searchedItems }));
  }, [dispatch, searchedItems]);

  useEffect(() => {
    const handleSearchProducts = () => {
      const newArr = [];

      for (let i = 0; i < products.length; i++) {
        const isNameMatched = products[i].name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
        if (isNameMatched) {
          newArr.push(products[i]);
        } else {
          for (let j = 0; j < products[i].platforms?.length; j++) {
            const platform = products[i].platforms[j];
            const isPlatformMatched = platform.name
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase());
            if (isPlatformMatched) {
              newArr.push(products[i]);
            }
          }
        }
      }

      setSearchedItem(newArr);
    };

    handleSearchProducts();
  }, [products, searchText]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* Header And Navbar */}
          <HeaderAndNavbar />

          {/* Product Section */}
          <section className="item">
            <div className="container card-container">
              <div className="item_text card-item-container justify-content-start">
                {products &&
                  currentItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <Pagination products={searchedItems} />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default SearchResult;
