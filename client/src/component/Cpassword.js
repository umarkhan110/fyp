import React, {useState} from 'react'
import { NavLink, useNavigate , useParams} from 'react-router-dom'
const Cpassword = () => {
    const history = useNavigate();
    const { email } = useParams();
    const [input, setInput] = useState({
        password: ''
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
       
         
          const handleClick = async (event) => {
            event.preventDefault();
            const { password } = input;
         
            //console.log(codeg)
            try {
              const res = await fetch(`/fypc/cforget/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                  password
                  })
              });
              const data = await res.json();
              console.log(data)
               if (res.status === 422 || !data) {
                window.alert(data.message);
                //console.log("invalid");  
              } else {
                // window.alert("Customer is Added Successfully");
        history("/customerlogin")
              }
            } catch (error) {
              console.log("Hostel not added")
            }
        
          }
  return (
    <div>
         <section className="section-signin">
            <div className="signin-form">        
                 <h3 className="heading-tertiary u-center-text yellow u-margin-bottom-small">Set Your New Password</h3>              
                     <form method="PUT" className="form">
                     <div className="form__group">
                         <label for="Password" className="form__label"> New Password</label>
                         <input type="password" onChange={handleChange}  name="password"
                                value={input.password}  className="form__input"  id="password" required></input>
                        </div>
                        
                        <button className="btn login-btn u-margin-bottom-small" type="submit" onClick={handleClick}>Confirm</button>
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

export default Cpassword