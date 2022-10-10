import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import "./css/Mine.css";
import "./css/responsive.css";
import { fetchProducts } from "./redux/features/products/productSlice";
import { fetchPlatforms } from "./redux/features/platform/platformSlice";
import Routers from "./routes/Routers";

import { checkUser } from "./redux/features/user/userSlice";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPlatforms());
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AYHmhnRZlbpE6YDHnj73ti0xr3YR23FZwoMi3l6-D5B-ePg9PSeXTeD8X8N9YhfoISVMngLTfyj03raQ",
      }}
    >
      <Routers />

      <ToastContainer />
    </PayPalScriptProvider>
  );
}

export default App;
