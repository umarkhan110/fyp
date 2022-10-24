import React, { useState, useEffect } from 'react'
import { NavLink} from 'react-router-dom'
import wrench from "../component/image/logo-white.png"
const Profile = () => {
 //   const history = useNavigate();
    const [profil, setProfil] = useState({
        contact: "",
        id: "",
        service: "",
        fname: "",
        image: "",
        lname: "",
        shopname: "",
        address: ""
    });
    console.log(profil)
    const profile = async () => {
        try {
            const res = await fetch('/fypsp/profile', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setProfil(data);
            console.log(data)
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
           // history('/splogin');
        }
    }
    useEffect(() => {
        profile();
        // eslint-disable-next-line
    }, []);

    return (
       <div>
         <section class="user-navigation">
        <div class="navigation">
            <input type="checkbox" class="navigation__checkbox" id="navi-toggle"></input>

            <label for="navi-toggle" class="navigation__button">
                <span class="navigation__icon">&nbsp;</span>
            </label>

            <div class="navigation__background">&nbsp;</div>

            <nav class="navigation__nav">
                <ul class="navigation__list">
                    <li class="navigation__item"><NavLink to="/" class="navigation__link"><span>01</span>Home</NavLink></li>
                    <li class="navigation__item"><NavLink to="/recentorders" class="navigation__link"><span>02</span>Recent Orders</NavLink></li>
                   <li class="navigation__item"><NavLink to="/profile" class="navigation__link"><span>03</span>Profile</NavLink></li>
          
                    </ul>
            </nav>
        </div>
        <div class="user-navigation__logo"><NavLink to="/"><img src={wrench} alt=""></img></NavLink></div>
        <div class="user-navigation__links">
           
            <li> <NavLink to="/recentorders"> Recent Orders</NavLink></li>
           
            <li class="profile-image"> <NavLink to="/profile"> <img src={profil.image} alt=""></img></NavLink></li>
            

        </div>
    </section>
    <h1 class="heading-primary u-center-text">Profile Page</h1>
    <section class="profile"> 
               <div class="profile__card ">
            
            <div class="profile__card--image u-margin-bottom-small u-margin-bottom-small">
                <img src={profil.image} alt="Profile image"></img>
                </div>
                <span class="profile__card--username">{profil.fname} {profil.lname}</span>
            <div class="profile__card--details">
                <p class="u-margin-bottom-small">
                <span class="profile__card--details--attribute">From</span>
                <span class="profile__card--details--values ">{profil.address}</span><br></br>
                </p>
                <p class="u-margin-bottom-small">
                <span class="profile__card--details--attribute">Shop Name</span>
                <span class="profile__card--details--values">{profil.shopname}</span><br></br>
                </p>
                <p class="u-margin-bottom-small">
                <span class="profile__card--details--attribute">Shop Location</span>
                <span class="profile__card--details--values">{profil.address}</span><br></br>
                </p>
            </div>
           </div>       
        
            <div class="profile__active-services">
               <h3 class="heading-tertiary profile__active-services--heading u-margin-bottom-medium">Active services</h3>
            
            <h3 class="heading-tertiary u-margin-bottom-small">Services</h3>
            <div class="available__box">
                <div class="available__box--name">
                    <h3 class="heading-tertiary ">{profil.service}</h3>
                </div>
            </div>
      </div>
    
    </section>
   
       </div>
    )
}

export default Profile