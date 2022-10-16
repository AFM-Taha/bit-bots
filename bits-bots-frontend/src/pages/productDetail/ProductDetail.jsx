import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getSingleGameApi } from "../../api";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import HeaderAndNavbar from "../../components/headerAndNavbar/HeaderAndNavbar";
import defaultImg from "../../assets/img/No Cover Available.png";
import Spinner from "../../components/spinner/Spinner";
import { addCart } from "../../redux/features/cart/cartSlice";

const ProductDetail = () => {
  const [singleProduct, setSingleProduct] = useState({});

  const { cover, name, screenshots, summary, platforms, price } = singleProduct;
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const pathname = location?.pathname?.includes("/product-detail");
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      const data = await getSingleGameApi(id);
      setSingleProduct(data);
      return data;
    };
    data();
  }, [id]);

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
                <Link to="/my-profile">{pathname && "Product Details"}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {!singleProduct.name ? (
        <Spinner />
      ) : (
        <section class="product_area">
          <div class="container">
            <div class="product_text">
              <div class="product_images_area">
                <div class="row">
                  <div class="col-md-5 col-lg-4">
                    <Tabs>
                      <div class="product_item">
                        <TabPanel>
                          <img src={cover || defaultImg} alt="" />
                        </TabPanel>
                      </div>
                      {screenshots?.map((img) => {
                        return (
                          <div class="product_item">
                            <TabPanel>
                              <img src={img} alt="" />
                            </TabPanel>
                          </div>
                        );
                      })}

                      <TabList>
                        <div class="tab-con">
                          <Tab>
                            <button class="tab-btn">
                              <img src={cover} alt="" />
                            </button>
                          </Tab>
                          {screenshots?.map((img) => {
                            return (
                              <Tab>
                                <button class="tab-btn">
                                  <img src={img} alt="" />
                                </button>
                              </Tab>
                            );
                          })}
                        </div>
                      </TabList>
                    </Tabs>
                  </div>
                  <div class="offset-lg-1 col-md-7 col-lg-5">
                    <div class="product_text_area">
                      <h3>{name}</h3>
                      <p>Chose platform:</p>
                      <div class="prodcutDetails">
                        {platforms?.map((platform) => {
                          return (
                            <button
                              class={
                                platform.name === selectedPlatform
                                  ? "active buttonlinks"
                                  : "buttonlinks"
                              }
                              onClick={() => {
                                setSelectedPlatform(platform.name);
                              }}
                              id="rakibopen"
                            >
                              {platform?.name}
                            </button>
                          );
                        })}
                      </div>

                      <div class="prodcut_price_details">
                        {/* <div id='ra' class='textContent'>
                          <h3>499 NOK</h3>
                        </div>

                        <div id='ak' class='textContent'>
                          <h3>88 NOK</h3>
                        </div>

                        <div id='ki' class='textContent'>
                          <h3>777 NOK</h3>
                        </div> */}
                        <div id="ki" class="textContent">
                          <h3>Price: $ {price}.00</h3>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          dispatch(addCart(singleProduct));
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="prodcut_content">
                <span>Product Description</span>
                <p>{summary}</p>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetail;
