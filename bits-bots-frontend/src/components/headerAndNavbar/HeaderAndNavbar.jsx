import {
  faSearch,
  faShoppingCart,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { signOut } from '../../redux/features/user/userSlice'

import logo from '../../assets/img/logo.png'

const HeaderAndNavbar = () => {
  const { cart } = useSelector((state) => state.cart)
  const { isLoading, platforms, error } = useSelector(
    (state) => state.platforms
  )
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(signOut())
    navigate('/login')
  }

  return (
    <div>
      {/* <!-- ============   1. Header area start   ============= --> */}
      <header className='header_area '>
        <div className='container'>
          <div className='header_text'>
            <div className='logo'>
              <Link to='/'>
                <img src={logo} alt='images' />
              </Link>
            </div>
            <div className='search'>
              <div className='desktopVersion_search d-md-block d-none'>
                <form action='index.html' method='POST'>
                  <input type='text' name='search' placeholder='Search..' />
                  <button>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </div>
              <div className='mobile_version_search  d-md-none d-block'>
                <div id='search_popup' className='content_pop'>
                  <div className='popup_w searchpopup'>
                    <div className='search_big icon-search_icon'>
                      <form
                        role='search'
                        id='search-form'
                        className='search-form'
                        action=''
                      >
                        <input
                          type='text'
                          name='s'
                          id='keyword'
                          onkeyup='fetch()'
                          placeholder='Search Dawa Life Sciences'
                        />
                        <button>
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </form>
                      <button
                        id='closesearch'
                        title='Close (Esc)'
                        type='button'
                        className='mfp-close'
                      >
                        ×
                      </button>
                    </div>
                    {/* <!-- <div id="datafetch"></div> --> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='cart'>
              <ul>
                <li className='position-relative'>
                  <Link to='/shopping-cart'>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Link>
                  {cart && <p className='cart-count '>{cart?.length}</p>}
                </li>
                <li>
                  <Link to='/my-profile'>
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li>
                  <p
                    style={{
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '30px',
                      marginLeft: '10px',
                    }}
                    onClick={handleLogOut}
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                  </p>
                </li>
                <li className='d-md-none d-block'>
                  <Link to='/' className='searchoption-none'>
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </li>

                {/* <!-- mobile humber menu area start  --> */}
                <li
                  className='rakibHumbergarMenu d-md-none d-block'
                  onClick='myFunction(this)'
                >
                  <div className='bar1'></div>
                  <div className='bar2'></div>
                  <div className='bar3'></div>
                </li>
                {/* <!-- mobile humber menu area End  --> */}
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- ============   1. Header area end   ============= --> */}

      {/* <!-- ============   2. Menu area start   ============= --> */}
      <menu className='menu'>
        <div className='container'>
          <div className='menuText'>
            <ul>
              {platforms?.map((platform) => {
                const { id, name } = platform
                return (
                  <li className='nav-li' key={id}>
                    <NavLink activeClassName='active' to={`/platforms/${id}`}>
                      <li> {name} </li>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </menu>
      {/* <!-- ============   2. Menu area end   ============= --> */}
    </div>
  )
}

export default HeaderAndNavbar
