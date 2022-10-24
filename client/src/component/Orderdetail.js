import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDistance } from 'geolib';
import whatsapp from "../component/image/whatsapp--v3.gif"
const Orderdetail = () => {
  // <a href={`https://api.whatsapp.com/send?phone=92${items.contact}`}>Whatsapp</a>
  const { id, lat, lng, lat1, lng1, id1 } = useParams();
  console.log(`${id}  ${lat} ${lat1}`)
  const distance = getDistance(
    { latitude: lat, longitude: lng },
    { latitude: lat1, longitude: lng1 }
  )
 // console.log(distance)
  const [time, setTime] = useState("");
  const float2int =(value)=> {
    return value | 0;
    }
  const tim = () => {
    const time = (distance / 750) + 5;
   const abc = float2int(time)
    setTime(abc)
  }
  const [items, setItems] = useState([]);
  const matchlat = async () => {
    try {
      const res = await fetch(`/fypc/detail/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setItems(data);
      console.log(data)
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      //console.log(error);
    }
  }
  const status = async () => {
    try {
      const res = await fetch(`/fypc/status/${id1}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    matchlat();
    tim();
    // eslint-disable-next-line
  }, []);
  return (
    <div>

      <section class="order-section">
        <div class="order-detail">
          <h3 class="u-center-text u-margin-bottom-small text-white">Estimated delivery time </h3>
          <h3 class="u-center-text u-margin-bottom-small text-white">{time} minutes</h3>
          <div class="order-detail__contact u-margin-bottom-small">
            <h4 class="order-detail__contact--text">contact service provider </h4>
            <a href={`https://api.whatsapp.com/send?phone=92${items.contact}`} class="order-detail__contact--icon"> <img src={whatsapp} alt="whatsapp"></img></a>
          </div>
          <h4 class="text-white u-margin-bottom-small">Order Details</h4>
          <div class="order-detail__info u-margin-bottom-small">
            <span class="order-detail__info--attribute text-white">Shop Name</span>
            <span class="order-detail__info--value text-yellow">{items.shopname}</span>
          </div>
          <div class="order-detail__info u-margin-bottom-small ">
            <span class="order-detail__info--attribute text-white">Order Address</span>
            <span class="order-detail__info--value text-yellow">{items.address}</span>
          </div>
          <div class="order-detail__info u-margin-bottom-small ">
            <span class="order-detail__info--attribute text-white">Delivery Fee</span>
            <span class="order-detail__info--value text-yellow">Rs : 70 </span>
          </div>

          {/* <!-- <div class="order-detail__view-more">
            <h4 class="order-detail__view-more--text text-white">View Details</h4>
            <a href="#"> <i class="order-detail__view-more--icon">icon</i></a>
          </div>
          <div class="order-detail__item">
            <span class=" order-detail__item--quantaty">1 liter petrol</span>
            <span class=" order-detail__item--price">Rs : 220</span>
          </div>
          <div class="order-detail__info ">
            <span class="order-detail__info--attribute">Delivery Fee</span>
            <span class="order-detail__info--value">Rs : 70 </span>
          </div> -->
          <!-- <div class="order-detail__info ">
            <span class="order-detail__info--attribute">Discount</span>
            <span class="order-detail__info--value">Rs : 0 </span>
          </div>
          <div class="order-detail__info ">
            <span class="order-detail__info--attribute">Total</span>
            <span class="order-detail__info--value">Rs : 470 </span>
          </div> --> */}

          <h4 class="text-white">Paid with</h4>
          <div class="order-detail__pay u-margin-bottom-small">
            <span class="order-detail__pay--text text-yellow">cash only delivery</span>
            {/* <!-- <span class="order-detail__pay--price">RS : 470.00</span> --> */}
          </div>
          <a href="/" ><button className='btn btn-primary' style={{left:"35%"}} onClick={status}>Order Completed</button></a>
        </div>

      </section>
    </div>
  )
}

export default Orderdetail

