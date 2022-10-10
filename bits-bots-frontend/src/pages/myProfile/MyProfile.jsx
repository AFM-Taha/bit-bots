import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Footer from '../../components/footer/Footer'
import HeaderAndNavbar from '../../components/headerAndNavbar/HeaderAndNavbar'
import { updateUser } from '../../api'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const { user } = useSelector((state) => state.user)

  const location = useLocation()
  let pathname
  if (location?.pathname === '/my-profile') {
    pathname = 'My Profile'
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    const getValue = (name) => {
      return e.target[name].value
    }

    const firstName = getValue('firstName')
    const lastName = getValue('lastName')
    const streetAddress = getValue('streetAddress')
    const zipCode = getValue('zipCode')
    const phone = getValue('phone')
    const city = getValue('city')
    const password = getValue('password')

    const userData = {
      firstName,
      lastName,
      email: user?.email,
      phone,
      zipCode,
      streetAddress,
      password,
      city,
    }
    const response = await updateUser(userData)
  }

  return (
    <div>
      <HeaderAndNavbar />
      <div class='pagination'>
        <div class='container'>
          <div class='pagination_text'>
            <p>You are here: </p>
            <ul>
              <li>
                <Link to='/'> Home</Link>
              </li>
              <li>
                <Link to='/my-profile'>{pathname}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class='input_cart my_profile'>
        <div class='container'>
          <div class='inputCart_text'>
            {/* <!-- single main cart start  --> */}
            <div class='input_single_cart_main'>
              <h2> My Profile</h2>
              <form onSubmit={handleUpdateProfile}>
                <div class='row g-4'>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-6'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-6'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-12'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='text'
                        name='streetAddress'
                        placeholder='Street Address'
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-6'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='text'
                        name='zipCode'
                        placeholder='Zip code'
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-6'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='text'
                        name='city'
                        placeholder='Enter city'
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-6'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={user?.email}
                        readOnly
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-6'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='text'
                        name='phone'
                        placeholder='Enter Phone'
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}
                  <div class='col-md-6'>
                    <div class='input_single_cart'>
                      <input
                        class='form-control'
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                      />
                    </div>
                  </div>
                  {/* <!-- single input area  --> */}

                  {/* <!-- btn area  input area  --> */}
                  <div class='col-md-12'>
                    <div class='input_single_cartBtn'>
                      <input
                        class='btn-style mt-2'
                        type='submit'
                        value='SAVE'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- single main cart End  --> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyProfile
