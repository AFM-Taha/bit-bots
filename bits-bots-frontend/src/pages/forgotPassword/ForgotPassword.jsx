import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
const ForgotPassword = () => {
  return (
    <section class='landingPage'>
      <div class='container'>
        <div class='landing_page_text'>
          <form action='' method='POST'>
            <div class='row'>
              <div class='col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                {/* <!-- landing page start  --> */}
                <div class='landingFormArea'>
                  <Link to='/'>
                    <img src={logo} alt='images' />
                  </Link>
                  <h2>Forgot password?</h2>
                  <p>
                    Please enter the email address for your BITS & BOTS account.
                  </p>
                  <div class='landingInputArea'>
                    {/* <!-- single item area start --> */}
                    <div class='landingInputArea_single'>
                      <input type='text' placeholder='EMAIL' />
                    </div>
                    {/* <!-- single item area End --> */}
                    {/* <!-- single item area start --> */}
                    <div class='landingInputArea_singleBtn'>
                      <input class='inputBtn' type='submit' value='Submit' />
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
  )
}

export default ForgotPassword
