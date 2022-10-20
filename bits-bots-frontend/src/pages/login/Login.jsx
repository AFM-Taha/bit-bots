import React from 'react'
import { useEffect } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import Spinner from '../../components/spinner/Spinner'
import auth from '../../firebase.init'
// import { signInUser } from '../../redux/features/user/userSlice'

const Login = () => {
  // const { isLoading, user, error } = useSelector((state) => state.user);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const navigate = useNavigate()

  const location = useLocation()

  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    if (!email && !password) return

    signInWithEmailAndPassword(email, password)

    // dispatch(signInUser({ email, password }))
  }

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (user?.user?.email) {
      navigate(from, { replace: true })
    }
  }, [user, from, navigate])

  // if (loading) {
  //   <Spinner />;
  //   return;
  // }

  return loading ? (
    <Spinner />
  ) : (
    <section class='landingPage'>
      <div class='container'>
        <div class='landing_page_text'>
          <form onSubmit={handleLogin}>
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
