import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logow from "./image/logo-white.png"
// import { Card } from 'react-bootstrap';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
//import { Latlang } from './Useplace'
const FuelDelivery = ({ google, locations = [] }) => {
  const { lat, lng } = useParams();
  // console.log(coordinate)
  const history = useNavigate();
  const [items, setItems] = useState([]);
  const [cldetail, setCldetail] = useState([]);
  const [input, setInput] = useState({
    service: ""
  })

  const matchlat = async () => {
    try {
      const res = await fetch(`/fypc/fueldelivery/${lat}/${lng}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setItems(data);
      setInput("Fuel Delivery")
      console.log(data)
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else if (res.status === 422 || !data) {
        window.alert(data.message);
        history('/chooseservices')
        // const error = new Error(res.error);
        // throw error;

      }
    } catch (error) {
      //console.log(error);
      history('/customerlogin')
    }
  }
  const { service } = input;
  const matchlat1 = async () => {
    try {
      const res = await fetch(`/fypc/cldetail`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setCldetail(data);
    } catch (error) {
      //console.log(error);
    }
  }
  // const { customerfname, customerlname, _id } = cldetail;
  const addrcorder = async (id) => {
    // event.preventDefault();
    //console.log(input.lemail);
    const { customerfname, customerlname } = cldetail;
    const res = await fetch('/fypc/recentorder', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerfname,
        customerlname,
        service,
        id
      })

    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid");
    }
  }

  useEffect(() => {
    matchlat();
    matchlat1();
    // eslint-disable-next-line
  }, []);

  return <div>

    <div>
      <section className="navigation-login">
        <div className="navigation-login__logo">
          <a href='/'><img src={logow}></img></a>
        </div>
        <NavLink to="/chooseservices" className="login"><b>Services</b></NavLink>
      </section>
      <section className='choose-service'>
        <h3 className="u-margin-bottom-small u-center-text text-white">Nearest Helper</h3>

        <div>
          {items.map((elem) => {
            const { _id, shopname, address, location, service } = elem;
            return (
              <div key={_id} className="u-margin-bottom-small choose-service__shop-order-detail">
                <form method="GET">
                  <p className=" choose-service__shop-order-detail--shop">
                    <span className="choose-service__shop-order-detail--shop--shopname">{shopname}</span>

                  </p>
                  <p className=" choose-service__shop-order-detail--time">{service}</p>
                  <p> <span className="choose-service__shop-order-detail--distance">{address}</span></p>
                  <NavLink to={`/orderdetail/${_id}/${lat}/${lng}/${location.coordinates[0]}/${location.coordinates[1]}`}><button className=" btn btn-order" onClick={() => addrcorder(_id)}>Place Order </button>
                  </NavLink>
                </form>
              </div>
            )
          })
          }
        </div>

      </section>

    </div>

  </div>;

};

export default FuelDelivery
