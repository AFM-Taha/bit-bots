import {
  faSearch,
  faShoppingCart,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

// import { signOut } from '../../redux/features/user/userSlice'

import { signOut } from "firebase/auth";

import logo from "../../assets/img/logo.png";
import auth from "../../firebase.init";
import { useState } from "react";

const HeaderAndNavbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { isLoading, platforms, error } = useSelector(
    (state) => state.platforms
  );
  const [searchText, setSearchText] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth).then(() => navigate("/login"));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchModal(false);
    navigate(`/search-result/${searchText}`);
  };

  return (
    <div>
      {/* <!-- ============   1. Header area start   ============= --> */}
      <header className="header_area">
        <div className="container">
          <div className="header_text">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="images" />
              </Link>
            </div>
            <div className="search">
              <div
                onPress={handleSearch}
                className="desktopVersion_search d-md-block d-none"
              >
                <form>
                  <input
                    required
                    type="text"
                    name="search"
                    placeholder="Search.."
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </div>
            </div>
            <div className="cart">
              <ul>
                <li className="position-relative">
                  <Link to="/shopping-cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Link>
                  {cart && <p className="cart-count ">{cart?.length}</p>}
                </li>
                <li>
<<<<<<< HEAD
                  <Link to='/register'>
=======
                  <Link to="/my-profile">
>>>>>>> 136b650b9639d7cf3ed2b324bc004ac9b652bdb4
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li>
                  <p
                    style={{
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "30px",
                      marginLeft: "10px",
                    }}
                    onClick={handleLogOut}
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                  </p>
                </li>
                <li
                  // onClick={() => setOpenMenu(!openMenu)}

                  onClick={() => setSearchModal(true)}
                  className="d-md-none d-block"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <Link className="searchoption-none">
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </li>

                {/*  */}

                {/* <button type="button" class="btn btn-primary">
                  Launch demo modal
                </button> */}
                <div
                  className="mobile-search-modal d-md-none"
                  style={searchModal ? { top: "0" } : { top: "-1000px" }}
                >
                  <button
                    onClick={() => setSearchModal(!searchModal)}
                    type="button"
                    class="close position-absolute bg-transparent border-0 text-white top-0"
                    style={{ fontSize: "50px", right: "15px" }}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <form onSubmit={handleSearch} className="mobile-search-form">
                    <input
                      required
                      type="text"
                      name="search"
                      placeholder="Search.."
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <input type="submit" value="search" />
                  </form>
                </div>

                {/*  */}

                {/* <!-- mobile humber menu area start  --> */}
                <li
                  className="rakibHumbergarMenu d-md-none d-block"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                </li>
                {/* <!-- mobile humber menu area End  --> */}
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- ============   1. Header area end   ============= --> */}

      {/* <!-- ============   2. Menu area start   ============= --> */}
      <menu className="menu">
        <div className="container">
          <div className="menuText">
            <ul
              className="align-items-start"
              style={openMenu ? { top: "65px" } : { top: "-500px" }}
            >
              {platforms?.map((platform) => {
                const { id, name } = platform;
                return (
                  <li className="nav-li" key={id}>
                    <NavLink activeClassName="active" to={`/platforms/${id}`}>
                      <li> {name} </li>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </menu>
      {/* <!-- ============   2. Menu area end   ============= --> */}
    </div>
  );
};

export default HeaderAndNavbar;
