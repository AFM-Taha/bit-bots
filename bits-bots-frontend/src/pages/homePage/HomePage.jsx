import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import ProductCard from '../../components/productCard/ProductCard'
import HeaderAndNavbar from '../../components/headerAndNavbar/HeaderAndNavbar'
import Banner from '../../components/banner/Banner'
import { useDispatch, useSelector } from 'react-redux'

import Spinner from '../../components/spinner/Spinner'
import Pagination from '../../components/pagination/Pagination'

const HomePage = () => {
<<<<<<< HEAD
  const { isLoading, products, error } = useSelector((state) => state.products)
  const currentItems = useSelector((state) => state.pagination.currentItems)
=======
  const { isLoading, products, error } = useSelector((state) => state.products);
  const currentItems = useSelector((state) => state.pagination.currentItems);
  const { user } = useSelector((state) => state.user);
>>>>>>> 136b650b9639d7cf3ed2b324bc004ac9b652bdb4

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* Header And Navbar */}
          <HeaderAndNavbar />

          {/* Banner  */}
          <Banner />

          {/* Product Section */}
          <section className='item'>
            <div className='container card-container'>
              <div className='item_text card-item-container'>
                {products &&
                  currentItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <Pagination products={products} />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  )
}

export default HomePage
