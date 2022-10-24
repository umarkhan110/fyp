import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Modal } from "react-bootstrap"
import wrench from './image/logo-yellow-white.png'
import logowhite from './image/logo-white.png'
import { BiCurrentLocation } from "react-icons/bi"
import { GoogleApiWrapper } from 'google-maps-react';
//import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import Map from './Map';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

Geocode.setApiKey(GOOGLE_MAP_API_KEY);
const google = window.google;
const Home = ({ google, locations = [] }, props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [address, setAdress] = useState("");
  const [items, setItems] = useState([]);
  const [latlng, setLatlng] = useState("Enter your location");
  const [lat, setLat] = useState("51.507351");
  const [lng, setLng] = useState("-0.127758");
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: ""
  })
  const handleSelect = async value => {
    const result = await geocodeByAddress(value);
    const latlng = await getLatLng(result[0]);
    setAdress(value)
    setLat(latlng.lat)
    setLng(latlng.lng)
    console.log(latlng.lat)
  }


  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(matchlat);
  //   } else {
  //     alert("Geolocation is not supported by this browser.")
  //   }
  // }
  const matchlat = async () => {
    const lat = lat;
    const lng = lng;
    console.log(lat)
    console.log(lng)
    // setLat(lat);
    // setLng(lng);
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);

      },
      (error) => {
        console.error(error);
      }
    );

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setAdress(address)
      },
      (error) => {
        console.error(error);
      }
    );
    try {
      const res = await fetch(`/fypc/latlng/${lat}/${lng}`, {
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
  // useEffect(() => {
  //   matchlat();
  //   // eslint-disable-next-line
  // }, []);
  const handleClick = num => {
    // setLat(num.lat)
    // setLng(num.lng)
    setAdress(num.address)
    setLat(num.mapPosition.lat)
    setLng(num.mapPosition.lng)
    console.log(num.mapPosition.lat)
    handleClose();
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Is this your live location?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Map
            google={google}

            center={{ lat: lat, lng: lng }}
            height='300px'
            zoom={15}
            handleClick={handleClick}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Continue
          </Button>
        </Modal.Footer> */}
      </Modal>
      <section className="signup-cross">
        <div className="signup-cross__close">
          <img src={wrench} alt="wranch" className="signup-cross__close--img"></img>
          <span className="signup-cross__close--text">Do you want buisness Account?</span>
          <NavLink to="/signupOption" className="signup-cross__close--btn btn">Sign up</NavLink>
          <a href="/" className="close" ><i className="signup-cross__close--cross">&nbsp;</i></a>
        </div>
      </section>
      <section className="navigation-login">
        <div className="navigation-login__logo">
          <img src={logowhite} alt=""></img>
        </div>
        <NavLink to="/loginOption" className="login"><b>LogIn</b></NavLink>
      </section>
      <section className="book">
      <h2 class="text-white heading-primary book__top-text">Getfix make your </h2>
        <h2 class="text-white u-margin-bottom-medium heading-primary book__bottom-text">Travelling Easier</h2>
               <div className="book__box">
          <div className="book__box--input">
            {/* <input type="text" placeholder="Enter your location" value={latlng}></input> */}
            <PlacesAutocomplete
              value={address}
              onChange={setAdress}
              onSelect={handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Location ...',
                      className: 'locat',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                      };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })} >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div className='book__box--input--button'>
              {address !== "" ? <BiCurrentLocation style={{ display: "block" }} onClick={handleShow} /> : <BiCurrentLocation style={{ display: "none" }} />}

            </div>

          </div>

          <div className="book__box--button">
            {address !== "" ? <NavLink to={`/mechanic/${lat}/${lng}`}><button className="btn btn-primary btn--book show-modal">Book Mechanic</button>
            </NavLink> : <NavLink to={`/mechanic/${lat}/${lng}`}><button disabled className="btn btn-primary btn--book show-modal">Book Mechanic</button>
            </NavLink>}

            {/* <a href="#" className="btn btn-primary btn--book show-modal" >Book Mechanic</a> */}
            {/* <a href="#" className="btn btn-primary btn--provide show-modal" onClick={handleShow}> Fuel Delivery </a> */}
            {address !== "" ? <NavLink to={`/fueldelivery/${lat}/${lng}`}><button className="btn btn-primary btn--book show-modal">Fuel Delivery</button>
            </NavLink> : <NavLink to={`/fueldelivery/${lat}/${lng}`}><button disabled className="btn btn-primary btn--book show-modal">Fuel Delivery</button>
            </NavLink>}
          </div>
        </div>


      </section>

      <footer class="footer">
        <div class="footer__logo-box">
          <img src={wrench} alt="Full logo" class="footer__logo"></img>
        </div>
        <div class="row">
          <div class="col-1-of-2">
            <div class="footer__navigation">
              <ul class="footer__list">
                <li class="footer__item"><a href="#" class="footer__link">Company</a></li>
                <li class="footer__item"><a href="#" class="footer__link">Contact us</a></li>
                <li class="footer__item"><a href="#" class="footer__link">Carrers</a></li>
                <li class="footer__item"><a href="#" class="footer__link">Privacy policy</a></li>
                <li class="footer__item"><a href="#" class="footer__link">Terms</a></li>
              </ul>
            </div>
          </div>
          <div class="col-1-of-2">
            <p class="footer__copyright">
              Built by <a href="#" class="footer__link">Getfix</a> for thier web App <a href="#" class="footer__link">Online Automobile Services</a>.
              Copyright &copy; by Getfix.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAxLuIqOTuNOAKTf21WzItkcet51uU99Ts"
})(Home)


