import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Banner from '../../components/banner/Banner'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import Footer from '../../components/footer/Footer'
import HeaderAndNavbar from '../../components/headerAndNavbar/HeaderAndNavbar'
import Pagination from '../../components/pagination/Pagination'
import Spinner from '../../components/spinner/Spinner'

import { fetchPlatformProducts } from '../../redux/features/platformProducts/platformProducts'

import genreData from '../../assets/genreData'
import { useState } from 'react'
import isPropertyMatched from '../../assets/isMatched'
import { initiatePagination } from '../../redux/features/pagination/paginationSlice'

const CategoryPage = () => {
  const { products } = useSelector((state) => state.products)

  const { platformGames } = useSelector((state) => state.platformGames)

  const currentItems = useSelector((state) => state.pagination.currentItems)
  console.log(currentItems)

  const [categoryProducts, setCategoryProducts] = useState([])

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPlatformProducts({ id, products }))
  }, [id, dispatch, products])

  useEffect(() => {
    setCategoryProducts(currentItems)
  }, [currentItems])

  useEffect(() => {
    dispatch(initiatePagination({ products }))
  }, [dispatch, products])

  const handleFilterByGenre = (id) => {
    const newArr = []

    for (let i = 0; i < platformGames.length; i++) {
      const checkPlatform = isPropertyMatched(platformGames[i], id, 'genres')
      if (checkPlatform) {
        newArr.push(platformGames[i])
      }
    }
    setCategoryProducts(newArr)
  }

  return (
    <div>
      <HeaderAndNavbar />

      {currentItems?.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Banner />
          <section className='checkBox'>
            <div className='container'>
              <div className='checkBox_text'>
                <div className='d-md-none d-block filter'>
                  <a href='#'>
                    <i
                      className='fa fa-sort-amount-desc'
                      aria-hidden='true'
                    ></i>{' '}
                    filter
                  </a>
                </div>
                <div className='row'>
                  {/* <!-- single item area start  --> */}
                  <div className='col-md-3'>
                    <div className='left_checkBox_area_extra'>
                      <div className='left_checkBox_area'>
                        <div className='checkbox_area '>
                          <h2>Genre</h2>
                          {genreData?.map((data) => (
                            <label key={data.id} class='custom_checkbox_2'>
                              <input
                                onChange={() => handleFilterByGenre(data.id)}
                                type='checkbox'
                                name='genre'
                              />{' '}
                              <p>
                                {' '}
                                <span>{data.name}</span>
                              </p>
                              <span className='checkmark'></span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- single item area start  --> */}
                  <div className='col-md-9'>
                    <div className='right_checkBox_area'>
                      <div className='row g-5'>
                        {categoryProducts.length !== 0 ? (
                          categoryProducts.map((product) => (
                            <CategoryCard key={product.id} product={product} />
                          ))
                        ) : (
                          <p
                            className='fw-bold'
                            style={{ textAlign: 'center', fontSize: '20px' }}
                          >
                            No games Available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <Pagination products={platformGames} />
      <Footer />
    </div>
  )
}

export default CategoryPage
