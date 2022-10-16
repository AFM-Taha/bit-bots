import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import PaypalPayment from "../components/paypalPayment/PaypalPayment";
import RequireAuth from "../components/requireAuth/RequireAuth";
import CategoryPage from "../pages/categoryPage/CategoryPage";
import CheckoutPage from "../pages/checkoutPage/CheckoutPage";
import Accessibility from "../pages/footerPages/Accessibility";
import Action from "../pages/footerPages/Action";
import Adventure from "../pages/footerPages/Adventure";
import Affiliates from "../pages/footerPages/Affiliates";
import CardGame from "../pages/footerPages/CardGame";
import Careers from "../pages/footerPages/Careers";
import Casual from "../pages/footerPages/Casual";
import Conditions from "../pages/footerPages/Conditions";
import Investors from "../pages/footerPages/Investors";
import Kompani from "../pages/footerPages/Kompani";
import PrivacyPolicy from "../pages/footerPages/PrivacyPolicy";
import PrivacyRights from "../pages/footerPages/PrivacyRights";
import Spydeberg from "../pages/footerPages/Spydeberg";
import Transparency from "../pages/footerPages/Transparency";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import HomePage from "../pages/homePage/HomePage";
import Login from "../pages/login/Login";
import MyProfile from "../pages/myProfile/MyProfile";
import ProductDetail from "../pages/productDetail/ProductDetail";
import Register from "../pages/register/Register";
import SearchResult from "../pages/searchResult/SearchResult";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import { fetchCart } from "../redux/features/cart/cartSlice";

const Routers = () => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(products));
  }, [dispatch, products]);
  return (
    <Routes>
      {/* public route start */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* public route end */}

      {/* Require aunt Start  */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/product-detail/:id"
        element={
          <RequireAuth>
            <ProductDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/shopping-cart"
        element={
          <RequireAuth>
            <ShoppingCart />
          </RequireAuth>
        }
      />
      <Route
        path="/checkout"
        element={
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
        }
      />
      <Route
        path="/my-profile"
        element={
          <RequireAuth>
            <MyProfile />
          </RequireAuth>
        }
      />
      <Route
        path="/platforms/:id"
        element={
          <RequireAuth>
            <CategoryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/paypal-payment"
        element={
          <RequireAuth>
            <PaypalPayment />
          </RequireAuth>
        }
      />
      <Route
        path="/search-result/:searchText"
        element={
          <RequireAuth>
            <SearchResult />
          </RequireAuth>
        }
      />
      {/* Require aunt End  */}

      {/* Footer pages Routing Start */}
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/genre/:genre" element={<Action />} />
      <Route path="/adventure" element={<Adventure />} />
      <Route path="/affiliates" element={<Affiliates />} />
      <Route path="/card-game" element={<CardGame />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/casual" element={<Casual />} />
      <Route path="/conditions" element={<Conditions />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/kompani" element={<Kompani />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/privacy-rights" element={<PrivacyRights />} />
      <Route path="/spydeberg" element={<Spydeberg />} />
      <Route path="/transparency" element={<Transparency />} />
      {/* Footer pages Routing End */}
    </Routes>
  );
};

export default Routers;
