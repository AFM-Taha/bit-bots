import React from "react";
import { Link } from "react-router-dom";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import logo from "../../assets/img/logo.png";
import auth from "../../firebase.init";
import { useState } from "react";
const ForgotPassword = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const [errorText, setErrorText] = useState("");

  return (
    <section class="landingPage">
      <div class="container">
        <div class="landing_page_text">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setErrorText("");
              const email = e.target.email.value;
              if (!email) {
                return setErrorText("Please provide an email");
              }
              sendPasswordResetEmail(email);
            }}
          >
            <div class="row">
              <div class="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                {/* <!-- landing page start  --> */}
                <div class="landingFormArea">
                  <Link to="/">
                    <img src={logo} alt="images" />
                  </Link>
                  <h2>Forgot password?</h2>
                  <p>
                    Please enter the email address for your BITS & BOTS account.
                  </p>
                  <div class="landingInputArea">
                    {/* <!-- single item area start --> */}
                    <div class="landingInputArea_single">
                      <input type="text" placeholder="EMAIL" name="email" />
                    </div>
                    {/* <!-- single item area End --> */}
                    {/* <!-- single item area start --> */}

                    {errorText && (
                      <p
                        style={{
                          textAlign: "center",
                          color: "#ffdede",
                          fontWeight: "600",
                          padding: "5px 0",
                        }}
                      >
                        {errorText}
                      </p>
                    )}

                    {error && (
                      <p
                        style={{
                          textAlign: "center",
                          color: "#ffdede",
                          fontWeight: "600",
                          padding: "5px 0",
                        }}
                      >
                        {
                          error.message
                            .split("(")[1]
                            .split(")")[0]
                            .split("/")[1]
                        }
                      </p>
                    )}

                    <div class="landingInputArea_singleBtn">
                      <input class="inputBtn" type="submit" value="Submit" />
                    </div>
                    {/* <!-- single item area End --> */}
                  </div>
                </div>
                {/* <!-- landing page End  --> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
