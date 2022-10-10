import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import Spinner from '../../components/spinner/Spinner'
import { registerNewUser } from '../../redux/features/user/userSlice'

const Register = () => {
  const { isLoading, user } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')

  const dispatch = useDispatch()

  const handleRegister = (e) => {
    setErrorText('')
    e.preventDefault()
    const userName = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    if (!userName || !email || !password)
      return setErrorText('Please input all information')

    const userData = { userName, email, password }

    dispatch(registerNewUser(userData))
  }

  useEffect(() => {
    if (user?.email) {
      navigate('/')
    }
  }, [user, navigate])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section class='landingPage'>
      <div class='container'>
        <div class='landing_page_text'>
          <form onSubmit={handleRegister}>
            <div class='row'>
              <div class='col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                {/* <!-- landing page start  --> */}
                <div class='landingFormArea'>
                  <Link to='/'>
                    <img src={logo} alt='images' />
                  </Link>
                  <div class='landingInputArea'>
                    {/* <!-- single item area start --> */}
                    <div class='landingInputArea_single'>
                      <input type='text' name='name' placeholder='NAME' />
                    </div>

                    <div class='landingInputArea_single'>
                      <input type='email' name='email' placeholder='EMAIL' />
                    </div>
                    {/* <!-- single item area End --> */}
                    {/* <!-- single item area start --> */}
                    <div class='landingInputArea_single'>
                      <input
                        type='password'
                        name='password'
                        placeholder='PASSWORD'
                      />
                    </div>
                    {/* <!-- single item area End --> */}
                    {/* <!-- single item area start --> */}

                    {errorText && <p style={{ color: 'red' }}>{errorText}</p>}

                    <div class='landingInputArea_singleBtn'>
                      <input class='inputBtn' type='submit' value='REGISTER' />
                    </div>
                    {/* <!-- single item area End --> */}
                    {/* <!-- single item area start --> */}
                    <div class='landingInputArea_singleBtn'>
                      <button
                        class='inputBtn'
                        onClick={() => navigate('/login')}
                      >
                        ALREADY USER? <b>LOGIN</b>
                      </button>
                    </div>
                    {/* <!-- single item area End --> */}
                  </div>
                  <Link to='/forgot-password'>Forgot password?</Link>
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

export default Register
