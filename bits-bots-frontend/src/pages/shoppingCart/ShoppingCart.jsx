import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Footer from "../../components/footer/Footer";
import HeaderAndNavbar from "../../components/headerAndNavbar/HeaderAndNavbar";
import defaultCover from "../../assets/img/No Cover Available.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { removeCart } from "../../redux/features/cart/cartSlice";

const ShoppingCart = () => {
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let pathname;
  if (location?.pathname === "/shopping-cart") {
    pathname = " Cart";
  }

  const itemPrices = cartItems?.map((item) => item.price);

  const totalPrice = itemPrices.reduce((x, y) => x + y, 0);

  return (
    <div>
      <HeaderAndNavbar />
      <div class="pagination">
        <div class="container">
          <div class="pagination_text">
            <p>You are here: </p>
            <ul>
              <li>
                <Link to="/"> Home</Link>
              </li>
              <li>
                <Link to="/my-profile">{pathname}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="checkout_area">
        <div class="container">
          <div class="checkout_text">
            {/* <!-- single checkout area start --> */}
            {cartItems.map((cartItem) => {
              const { name, cover, price } = cartItem;
              return (
                <div class="checkout_single_item">
                  <div class="checkout_left_item">
                    <img src={cover || defaultCover} alt="images" />
                    <p>{name}</p>
                  </div>
                  <div class="checkout_right_close">
                    <p>$ {price}</p>
                    <span onClick={() => dispatch(removeCart(cartItem))}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                </div>
              );
            })}
            {/* <!-- single checkout area End --> */}

            {/* <!-- single checkout area start --> */}
            <div class="checkout_single_item">
              <div class="checkout_left_item ps-5">
                <p>Total</p>
              </div>
              <div class="checkout_right_close pe-5">
                <p>$ {totalPrice}</p>
              </div>
            </div>

            {/* <!-- single checkout area End --> */}
            <div class="checkout_cart_btn">
              <button
                onClick={() => {
                  if (cartItems?.length === 0) {
                    return toast.warning("No item in the cart");
                  }
                  navigate("/checkout");
                }}
                class="btn-style my-3"
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
