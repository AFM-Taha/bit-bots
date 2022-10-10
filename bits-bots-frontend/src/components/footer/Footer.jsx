import React from "react";
import { Link } from "react-router-dom";
// import './Footer.modul.css'

const Footer = () => {
  return (
    <footer className="footer_area">
      <div className="container">
        <div className="footer_text">
          <div className="row g-5">
            {/* <!-- single item area start  --> */}
            <div className="col-md-3 col-sm-6">
              <div className="footer_single_item">
                <h4>Bits & Bots</h4>
                <ul>
                  <li>
                    <Link to="/kompani">Kompani veien 31 </Link>
                  </li>
                  <li>
                    <Link to="/spydeberg">1820 Spydeberg</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- single item area start  --> */}
            {/* <!-- single item area start  --> */}
            <div className="col-md-3 col-sm-6">
              <div className="footer_single_item">
                <h4>LEGAL & PRIVACY</h4>
                <ul>
                  <li>
                    <Link to="/privacy-rights">CA Privacy Rights </Link>
                  </li>
                  <li>
                    <Link to="/transparency">CA Transparency Act</Link>
                  </li>
                  <li>
                    <Link to="/conditions">Conditions of Use</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- single item area start  --> */}
            {/* <!-- single item area start  --> */}
            <div className="col-md-3 col-sm-6">
              <div className="footer_single_item">
                <h4>ABOUT US</h4>
                <ul>
                  <li>
                    <Link to="/accessibility">Accessibility</Link>
                  </li>
                  <li>
                    <Link to="/affiliates">Affiliates</Link>
                  </li>
                  <li>
                    <Link to="/careers">Careers</Link>
                  </li>
                  <li>
                    <Link to="/investors">Investors</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* single item area start  */}
            {/* single item area start   */}
            <div className="col-md-3 col-sm-6">
              <div className="footer_single_item">
                <h4>GENRE</h4>
                <ul>
                  <li>
                    <Link to="/genre/33">Action</Link>
                  </li>
                  <li>
                    <Link to="/genre/31">Adventure</Link>
                  </li>

                  <li>
                    <Link to="/genre/35">Board/Card Game</Link>
                  </li>
                  <li>
                    <Link to="/genre/14">Sports</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* single item area start   */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
