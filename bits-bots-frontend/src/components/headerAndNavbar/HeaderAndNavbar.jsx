import {
  faSearch,
  faShoppingCart,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

// import { signOut } from '../../redux/features/user/userSlice'

import { signOut } from 'firebase/auth'

import logo from '../../assets/img/logo.png'
import auth from '../../firebase.init'
import { useState } from 'react'

const HeaderAndNavbar = () => {
  const { cart } = useSelector((state) => state.cart)
  const { isLoading, platforms, error } = useSelector(
    (state) => state.platforms
  )
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  const handleLogOut = () => {
    signOut(auth).then(() => navigate('/login'))
  }
  const handleSearch = () => {
    navigate(`/search-result/${searchText}`)
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
              <div
                onPress={handleSearch}
                className='desktopVersion_search d-md-block d-none'
              >
                <form>
                  <input
                    required
                    type='text'
                    name='search'
                    placeholder='Search..'
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button onClick={handleSearch}>
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
                  <Link to='/register'>
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
