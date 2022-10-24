import React from 'react'
import { NavLink } from 'react-router-dom'
import wrench from'./image/logo-yellow-white.png'
const LoginOption = () => {
  return (
    <div>
         <section className="signup-cross">
        <div className="signup-cross__close">
            <img src={wrench} alt="wranch" className="signup-cross__close--img"></img>
            <span className="signup-cross__close--text">Do you want buisness Account?</span>
            <NavLink to="/signupOption" className="signup-cross__close--btn btn">Sign up</NavLink>
            <a href="/"  className="close" ><i className="signup-cross__close--cross">&nbsp;</i></a>
        </div>

    </section>
    <section className="login-details">
        <h1 className="heading-primary">
            <span>Signin to continue</span><br></br>
            <span>our Services</span>
        </h1>
        <div className='row'>
          <div className='.col-1-of-2'>
          <NavLink to="/customerlogin" className="log-details__btn">Customer <span className="log-details__btn--arrow"> <b>&rarr;</b></span></NavLink>
        
          </div>
          <div className='.col-1-of-2'>
          <NavLink to="/splogin" className="log-details__btn">Service Provider<span className="log-details__btn--arrow">  <b>&rarr;</b></span></NavLink>
   
          </div>
        </div>
        </section>
    </div>
  )
}

export default LoginOption