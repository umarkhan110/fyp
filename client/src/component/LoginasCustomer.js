import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import wrench from'./image/logo-yellow-white.png'
const LoginasCustomer = () => {
  const history = useNavigate();
    const [input1, setInput1] = useState({
        email: '',
        password: ''
      });
    function handleChange1(event) {
        const { name, value } = event.target;
        setInput1(prevInput => {
          return {
            ...prevInput,
            [name]: value
          }
        })
      }
      const handleClick1 = async (event) => {
        event.preventDefault();
        //console.log(input.lemail);
        const { email, password } = input1;
        const res = await fetch('/fypc/customersignin', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
    
        });
    
        const data = res.json();
        if (res.status === 400 || !data) {
          window.alert("Invalid");
        }
        else {
          // dispatch({type:"USER", payload:true});
          //alert("Signin Successfully")
         history("/chooseservices");
        }
    
      }
  
    return (
        <div>
          <section className="signup-cross">
                <div className="signup-cross__close">
                    <NavLink to="/"><img src={wrench} alt="wranch" className="signup-cross__close--img" /></NavLink>
                        <span className="signup-cross__close--text">Do you want buisness Account?</span>
                        <NavLink to="/signupOption" className="signup-cross__close--btn btn">Sign up</NavLink>
                        <a href="/" className="close" ><i className="signup-cross__close--cross">&nbsp;</i></a>
                </div>
            
                <section className="section-signin">
                    <div className="signin-form">
                        <div className="logo u-center-text ">
                            <b><span className="white">Get</span>
                                <span className="blue">Fix</span>
                            </b>
                        </div>
                        <h3 className="heading-tertiary u-center-text yellow u-margin-bottom-big">Get aided by our services</h3>
                        <form action="#" className="form">
                            <div className="form__group">
                                <label for="email" className="form__label">Enter your email(required)</label>
                                <input onChange={handleChange1} type="text" name="email" placeholder="" value={input1.email} className="form__input" id="email" required />
                            </div>
                            <div className="form__group">
                                <label for="Password" className="form__label">Password</label>
                                <input onChange={handleChange1}  type="password" name="password" value={input1.password} className="form__input" id="password" required />
                            </div>
                            <button className="btn login-btn u-margin-bottom-small" onClick={handleClick1}>Login</button>
                            <div className="section-signin__text">
                            <NavLink to="/forget" >Forget</NavLink> <br></br> Dont have an account ? <NavLink to="/loginOption" className="">Signup</NavLink>
                                <br></br> <NavLink to="/loginOption" > Go back</NavLink>
                            </div>
                        </form>

                    </div>

                </section>
         
            </section>
        </div>
    )
}

export default LoginasCustomer