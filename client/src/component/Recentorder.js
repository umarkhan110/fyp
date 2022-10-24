import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import wrench from "../component/image/logo-white.png"
const Recentorder = () => {
  const [order, setOrder] = useState([]);
  const matchlat1 = async () => {

    // console.log(lat)

    try {
      const res = await fetch(`/fypc/rcorder`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setOrder(data);
      console.log(data)
      // if (res.status === 422 || !data) {
      //   window.alert(data.message);
      //   // const error = new Error(res.error);
      //   // throw error;

      // }
    } catch (error) {
      //console.log(error);
    }
  }
  useEffect(() => {
    matchlat1();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <section className="user-navigation">
        <div className="navigation">
          <input type="checkbox" className="navigation__checkbox" id="navi-toggle"></input>

          <label for="navi-toggle" className="navigation__button">
            <span className="navigation__icon">&nbsp;</span>
          </label>

          <div className="navigation__background">&nbsp;</div>

          <nav className="navigation__nav">
            <ul className="navigation__list">
              <li className="navigation__item"><NavLink to="/" className="navigation__link"><span>01</span>Home</NavLink></li>
              <li className="navigation__item"><NavLink to="/recentorders" className="navigation__link"><span>02</span>Recent Orders</NavLink></li>
              <li class="navigation__item"><NavLink to="/profile" class="navigation__link"><span>03</span>Profile</NavLink></li>
               </ul>
          </nav>
        </div>
        <div className="user-navigation__logo"><NavLink to="/"><img src={wrench} alt=""></img></NavLink></div>
        <div className="user-navigation__links">
         
          <li> <NavLink to="/recentorders"> Recent Orders</NavLink></li>
          <li> <NavLink to="/profile"> Profile</NavLink></li>
        
        </div>
      </section>
      <section className="recent-orders">
        <h2 className="heading-secondary u-center-text u-margin-bottom-medium">Orders Details</h2>
        <div className="row">
          <div className="col-1-of-2">
            <h2 className="u-margin-bottom-small">Today</h2>
            <span className="recent-orders__total-earning--today">

            </span>
            <div >
              {order.map((elem) => {
                const { _id, customerfname, customerlname, service } = elem;
                return (
                  <div key={_id} className="recent-orders__card u-margin-bottom-medium">
                    <form method="GET">

                      <div className="recent-orders__card--time-box">
                        <span className="recent-orders__card--time-box--time">Time  : 04:56</span>

                      </div>
                      <span className="recent-orders__card--item">Item</span>
                      <div className="recent-orders__card--user-box">
                        <span className="recent-orders__card--user-box--username">{customerfname} {customerlname}</span>
                        <span className="recent-orders__card--user-box--status"> Complete</span>
                      </div>
                    </form>
                  </div>
                )
              })
              }


            </div>
          </div>
          
        </div>
      </section>

    </div>
  )
}

export default Recentorder