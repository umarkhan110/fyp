import React from 'react'
import { NavLink } from 'react-router-dom'
import logow from "./image/logo-white.png"
const SignupOption = () => {
  return (
    <div>
      <section className="navigation-login">
        <div className="navigation-login__logo">
          <a href='/'>
            <img src={logow}></img>
          </a>
        </div>
        <NavLink to="/loginOption" className="login"><b>LogIn</b></NavLink>
      </section>

      <section className="login-details">
        <h1 className="heading-primary">
          <span>Signup to avail </span><br></br>
          <span>our Services</span>
        </h1>
        <div className='row'>
          <div className='col-1-of-2'><NavLink to="/customersignup" className="btn login-details__btn">Customer <span className="login-details__btn--arrow"><b>&rarr;</b> </span></NavLink>
          </div>
          <div className='col-1-of-2'><NavLink to="/spsignup" className="btn login-details__btn">Service Provider<span className="login-details__btn--arrow"> <b>&rarr;</b></span></NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignupOption
