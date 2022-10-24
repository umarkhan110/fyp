import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logow from "./image/logo-white.png"
const SignupasCustomer = () => {
    const history = useNavigate();
    const [codeg, setCode] = useState('');
    const [input, setInput] = useState({
        customerfname: '',
        customerlname: '',
        email: '',
        password: '',
        contact: '',
        image: '',
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
        const handleChangeI = (event) => {
            console.log(event.target.files[0]);
            setInput({ ...input, image: event.target.files[0] })
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
           const formData = new FormData();
            formData.append('customerfname', input.customerfname);
            formData.append('customerlname', input.customerlname);
            formData.append('contact', input.contact);
            formData.append('email', input.email);
            formData.append('password', input.password);
            formData.append('image', input.image, input.image.name);
            formData.append('code', input.code);
            formData.append('codeg', codeg);
            
            event.preventDefault();
            try {
              const res = await fetch('/fypc/customersignup/', {
                body: formData,
                method: "POST",
              });
              const data = await res.json();
              //console.log(data.message)
              if (res.status === 422 || !data) {
                window.alert(data.message);
                //console.log("invalid");  
              } else {
                window.alert("Customer is Added Successfully");
         history("/customerlogin")
              }
            } catch (error) {
              console.log("Hostel not added")
            }
        
          }
    return (
        <div>
            <section className="navigation-login">
                <div className="navigation-login__logo">
                   <a href='/'><img src={logow}></img></a>
                </div>
                <NavLink to="/loginOption" className="login"><b>LogIn</b></NavLink>
            </section>
            <section className="section-signup">
                <div className="signin-form">
                    
                    <h3 className="heading-tertiary u-center-text yellow u-margin-bottom-small">Get aided by our services</h3>
                    <form action="#" className="form">
                        <div className="form__group">
                            <input onChange={handleChange} type="text" name="customerfname"
                      value={input.customerfname} className="form__input" placeholder="Firstname" id="firstname" required />
                        </div>
                        <div className="form__group">
                            <input onChange={handleChange} type="text" name="customerlname"
                       value={input.customerlname} className="form__input" placeholder="Lastname" id="lastname" required />
                        </div>
                        <div className="form__group">
                            <input onChange={handleChange} type="text" name="email"
                       value={input.email} className="form__input" placeholder="Email" id="email" required />
                       <button onClick={verify}>Verify</button>
                        </div>
                        <div className="form__group">
                            <input onChange={handleChange} type="text" name="code"
                                value={input.code} className="form__input" placeholder="Code" id="email" required />     
                        </div>
                        <div className="form__group">
                            <input onChange={handleChange} type="text" name="password"
                       value={input.password} className="form__input" placeholder="Password" id="password" required />
                        </div>
                        <div className="form__group">
                            <input onChange={handleChange} type="tel" name="contact"
                       value={input.contact} className="form__input" id="contact" placeholder="Contact Number" />
                        </div>
                        <div className="form__group">
                            <label for="email" className="form__label">Select an image</label>
                            <input onChange={handleChangeI} type="file" className="form__input" name="image" id="image" placeholder="Select a Photo" />
                        </div>
                        <button className="btn login-btn u-margin-bottom-small" type="submit" onClick={handleClick}>Signup</button>
                        <div className="section-signin__text">
                            Dont have already an account ? <NavLink to="/loginOption" className="">Signin</NavLink>
                            <br></br> <NavLink to="/loginOption" > Go back</NavLink>
                        </div>
                    </form>

                </div>
            </section>
        </div>
    )
}

export default SignupasCustomer



