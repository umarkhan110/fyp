import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import wrench from './image/logo-yellow-white.png'
const Cforget = () => {
    const history = useNavigate();
    const [codeg, setCode] = useState('');
    const [input, setInput] = useState({
        email: '',
        code: ''
        });
        function handleChange (event){
        const {name, value} = event.target;
        setInput(prevInput =>{
        return{
        ...prevInput,
        [name]: value
        }
        })
        }
       
          const verify = async (event) => {
            event.preventDefault();
            const { email } = input;
            const res = await fetch('/fypc/customersignupverify', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email
              })
            });
                const data = await res.json();
                setCode(data.message)
                console.log(data.message);
          }
          const handleClick = async (event) => {
            event.preventDefault();
            const { email, code } = input;
            const code1 = Number(code);
            console.log(codeg)
            try {
              const res = await fetch('/fypc/cforgetpass/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email,
                    code1,
                    codeg
                  })
              });
              const data = await res.json();
              console.log(data)
               if (res.status === 422 || !data) {
                window.alert(data.message);
                //console.log("invalid");  
              } else {
                // window.alert("Customer is Added Successfully");
         history(`/password/${email}`)
              }
            } catch (error) {
              console.log("Hostel not added")
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
                    <h3 className="heading-tertiary u-center-text yellow u-margin-bottom-small">Set Your New Password</h3>
                    <form method='POST' className="form">
                        <div className="form__group">
                            <label for="email" className="form__label">Enter your email(required)</label>
                            <input  onChange={handleChange} type="text" name="email"
                       value={input.email}className="form__input input-width" id="email" required></input>
                            <button className="" onClick={verify}>Verify</button>
                        </div>

                        <div className="form__group">
                            <label for="Password" className="form__label"> Code</label>
                            <input type="text" onChange={handleChange}  name="code"
                                value={input.code} className="form__input" id="password" required></input>
                        </div>
                       
                     <button className="btn login-btn u-margin-bottom-small" type="submit" onClick={handleClick}>Continue</button>
                        <div className="section-signin__text">
                            Dont have already an account ? <NavLink to="/loginOption" className="">Signin</NavLink>
                            <br></br> <NavLink to="/loginOption" > Go back</NavLink>
                        </div>
                    </form>
                </div>
            </section>
</section>
        </div>
    )
}

export default Cforget