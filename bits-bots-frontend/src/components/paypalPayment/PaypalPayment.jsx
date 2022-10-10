import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { OrderContext } from "../../App";
import { emptyCart } from "../../redux/features/cart/cartSlice";

const PaypalPayment = () => {
  const dispatch = useDispatch();
  const [paidFor, setPaidFor] = useState(false);

  const cartItems = useSelector((state) => state.cart.cart);
  const itemPrices = cartItems?.map((item) => item.price);
  const totalPrice = itemPrices.reduce((x, y) => x + y, 0);
  const navigate = useNavigate();

  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };
  if (paidFor) {
    localStorage.removeItem("cart");
    dispatch(emptyCart());
    navigate("/");
  }

  const [error, setError] = useState(null);

  if (error) {
    toast.warning("Something is wrong ");
  }

  const orderData = JSON.parse(localStorage.getItem("orderdata"));

  const { firstName, lastName, zipCode, phone, streetAddress, email, city } =
    orderData;
  return (
    <div className="container">
      <div class="input_single_cart_main" style={{ background: "transparent" }}>
        <h2>Completing Payment</h2>

        <div class="row g-4">
          {/* <!-- single input area  --> */}
          <div class="col-md-6">
            <div class="input_single_cart">
              <input
                class="form-control"
                type="text"
                name="firstname"
                value={firstName}
                disabled
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
                value={lastName}
                disabled
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
                value={streetAddress}
                disabled
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
                value={zipCode}
                disabled
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
                value={city}
                disabled
              />
            </div>
          </div>

          {/* <!-- single input area  --> */}
          <div class="col-md-6">
            <div class="input_single_cart">
              <input class="form-control" type="email" value={email} disabled />
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
                value={phone}
                disabled
              />
            </div>
          </div>
          {/* <!-- btn area  input area  --> */}
        </div>
      </div>

      <div className="w-full" style={{ marginTop: "-40px" }}>
        <PayPalButtons
          style={{ display: "block", width: "100% !important" }}
          className="w-full d-flex justify-content-center"
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "product.description",
                  amount: {
                    value: totalPrice,
                  },
                },
              ],
            });
          }}
          onClick={(data, actions) => {
            // Validate on button click, client or server side
            const hasAlreadyBoughtCourse = false;

            if (hasAlreadyBoughtCourse) {
              setError(
                "You already bought this course. Go to your account to view your list of courses."
              );

              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order);
            toast.success("Successfully Paid");
            handleApprove(data.orderID);
            localStorage.removeItem("orderdata");
          }}
          onCancel={() => {
            // Display cancel message, modal or redirect user to cancel page or back to cart
          }}
          onError={(err) => {
            setError(err);
            console.error("PayPal Checkout onError", err);
          }}
        />
      </div>
    </div>
  );
};

export default PaypalPayment;
