import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import HeaderAndNavbar from "../../components/headerAndNavbar/HeaderAndNavbar";
import defaultCover from "../../assets/img/No Cover Available.png";
import { removeCart } from "../../redux/features/cart/cartSlice";

import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemPrices = cartItems?.map((item) => item.price);
  const totalPrice = itemPrices.reduce((x, y) => x + y, 0);

  const cartProducts = cartItems?.map((item) => {
    return { name: item.name, price: item.price, id: item.id };
  });

  const handlePayment = (e) => {
    e.preventDefault();

    const getValue = (name) => {
      return e.target[name].value;
    };

    const firstName = getValue("firstname");
    const lastName = getValue("lastname");
    const streetAddress = getValue("streetaddress");
    const phone = getValue("phone");
    const zipCode = getValue("zipcode");
    const city = getValue("city");
    const email = user?.email;
    const products = cartProducts;

    const isConfirm = window.confirm(
      "You will redirect to the payment page, press 'OK' to confirm"
    );

    if (isConfirm) {
      localStorage.setItem(
        "orderdata",
        JSON.stringify({
          firstName,
          lastName,
          streetAddress,
          phone,
          zipCode,
          city,
          email,
          products,
        })
      );

      navigate("/paypal-payment");
    }
    return;
  };

  return (
    <div>
      <HeaderAndNavbar />
      {/* <!-- ============   2. Menu area end   ============= --> */}
      <div class="pagination">
        <div class="container">
          <div class="pagination_text">
            <p>You are here: </p>
            <ul>
              <li>
                <Link to="/"> Home</Link>
              </li>
              <li>
                <Link to="/shopping-cart">Cart</Link>
              </li>
              <li>
                <Link to="/checkout">Shipping Details</Link>
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
          </div>
        </div>
      </div>
      <div class="input_cart">
        <div class="container">
          <div class="inputCart_text">
            {/* <!-- single main cart start  --> */}
            <div class="input_single_cart_main">
              <h2>Shipping</h2>
              <form onSubmit={handlePayment}>
                <div class="row g-4">
                  {/* <!-- single input area  --> */}
                  <div class="col-md-6">
                    <div class="input_single_cart">
                      <input
                        class="form-control"
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        required
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class="col-md-6">
                    <div class="input_single_cart">
                      <input
                        class="form-control"
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class="col-md-12">
                    <div class="input_single_cart">
                      <input
                        class="form-control"
                        type="text"
                        name="streetaddress"
                        placeholder="Street Adress"
                        required
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class="col-md-6">
                    <div class="input_single_cart">
                      <input
                        class="form-control"
                        type="text"
                        name="zipcode"
                        placeholder="Zip code"
                        required
                      />
                    </div>
                  </div>

                  {/* <!-- single input area  --> */}
                  <div class="col-md-6">
                    <div class="input_single_cart">
                      <input
                        class="form-control"
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>

                  {/* <!-- single input area  --> */}
                  <div class="col-md-6">
                    <div class="input_single_cart">
                      <input
                        class="form-control"
                        type="email"
                        name="email"
                        value={user?.email}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* <!-- single input area  --> */}

                  {/* <!-- single input area  --> */}
                  <div class="col-md-6">
                    <div class="input_single_cart">
                      <input
                        class="form-control"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        required
                      />
                    </div>
                  </div>
                  {/* <!-- btn area  input area  --> */}
                  <div class="col-md-12">
                    <div class="input_single_cartBtn">
                      <input class="btn-style mt-2" type="submit" value="Pay" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- single main cart End  --> */}
            {/* <!-- single main cart start  --> */}

            {/* <!-- single main cart End  --> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
