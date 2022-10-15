import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import HeaderAndNavbar from '../../components/headerAndNavbar/HeaderAndNavbar'
import Pagination from '../../components/pagination/Pagination'
import ProductCard from '../../components/productCard/ProductCard'
import Spinner from '../../components/spinner/Spinner'

const SearchResult = () => {
  const { isLoading, products, error } = useSelector((state) => state.products)
  const currentItems = useSelector((state) => state.pagination.currentItems)
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* Header And Navbar */}
          <HeaderAndNavbar />

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

export default SearchResult
