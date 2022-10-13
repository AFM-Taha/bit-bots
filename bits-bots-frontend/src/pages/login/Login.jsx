import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { signInUser } from '../../redux/features/user/userSlice'

const Login = () => {
  const { isLoading, user, error } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    if (!email && !password) return

    dispatch(signInUser({ email, password }))
  }

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (user?.email) {
      navigate(from, { replace: true })
    }
  }, [user])

  return (
    <section class='landingPage'>
      <div class='container'>
        <div class='landing_page_text'>
          <form onSubmit={handleLogin}>
            <div class='row'>
              <div class='col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                {/* <!-- landing page start  --> */}
                <div class='landingFormArea'>
                  <a href='index.html'>
                    <img src={logo} alt='images' />
                  </a>
                  <div class='landingInputArea'>
                    {/* <!-- single item area start --> */}
                    <div class='landingInputArea_single'>
                      <input type='text' name='email' placeholder='EMAIL' />
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
                    <div class='landingInputArea_singleBtn'>
                      <input class='inputBtn' type='submit' value='LOG IN' />
                    </div>
                    {/* <!-- single item area End --> */}
                    {/* <!-- single item area start --> */}
                    <div class='landingInputArea_singleBtn'>
                      <button
                        class='inputBtn'
                        onClick={() => navigate('/register')}
                      >
                        NEW USER? <b>REGISTER</b>
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

export default Login
