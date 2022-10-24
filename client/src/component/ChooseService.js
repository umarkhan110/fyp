import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Modal } from "react-bootstrap"
import Map from './Map';
import { BiCurrentLocation } from "react-icons/bi"
import wrench from './image/logo-yellow-white.png'
import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
Geocode.setApiKey("AIzaSyAxLuIqOTuNOAKTf21WzItkcet51uU99Ts");

const ChooseService = ({ google, locations = [] }) => {
  const { lat1, lng1 } = useParams();
  const { lat2, lng2 } = useParams();
  // console.log(lat1)
  const history = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [input, setInput] = useState({
    service: ""
  })
  const [items, setItems] = useState([]);
  const [cldetail, setCldetail] = useState([]);
  const [address, setAdress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const [dis, setDis] = useState({
    distance: '',
    duration: ''
  });

  const handleSelect = async value => {
    const result = await geocodeByAddress(value);
    const latlng = await getLatLng(result[0]);
    setAdress(value)
    setCoordinates(latlng)
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }
  const { lat, lng } = coordinates;
  const { service } = input;
  const matchlat = async () => {
    //console.log(lat)
    try {
      const res = await fetch(`/fypc/latlng/${lat}/${lng}/${service}`, {
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
      if (res.status === 422 || !data) {
        window.alert(data.message);
        // const error = new Error(res.error);
        // throw error;   
        history("/noservice")
      }
    } catch (error) {
      //console.log(error);
    }
  }

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

  const handleClick = num => {
    // setLat(num.lat)
    // setLng(num.lng)
    setAdress(num.address)
    setCoordinates(num.mapPosition)
    // setLng(num.mapPosition.lng)
    console.log(num.mapPosition.lat)
    handleClose();
  }


  useEffect(() => {
    matchlat1();
    // eslint-disable-next-line
  }, []);

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
      </Modal>
      <section className="signup-cross">
                <div className="signup-cross__close">
                    <NavLink to="/"><img src={wrench} alt="wranch" className="signup-cross__close--img" /></NavLink>
                        <span className="signup-cross__close--text">Do you want buisness Account?</span>
                        <NavLink to="/signupOption" className="signup-cross__close--btn btn">Sign up</NavLink>
                        <a href="/" className="close" ><i className="signup-cross__close--cross">&nbsp;</i></a>
                </div>
                </section>
      <section className="choose-service ">
        <h2 className="u-margin-bottom-medium u-center-text">Choose a service</h2>
        <div className="choose-service__options u-margin-bottom-small">
          <select value={input.service} name="service" onChange={handleChange} className="choose-service__options--select" aria-label="Default select example">
            <option style={{ color: "white" }}>Select Services</option>
            <option style={{ color: "white" }} value="Fuel Provider" >Fuel Provider</option>
            <option style={{ color: "white" }} value="Mechanic" >Mechanic</option>
            <option style={{ color: "white" }} value="Tyre Repairing" >Tyer Repairing</option>
          </select>
        </div>
        <div className="choose-service__location u-margin-bottom-small">
          <PlacesAutocomplete
            value={address}
            onChange={setAdress}
            onSelect={handleSelect}>

            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Shop Location',
                    className: 'form__input',
                    id: 'firstname'
                  })}
                  style={{ color: "black" }}
                />
                <div className="autocomplete-dropdown-container" style={{ width: "300px" }}>
                  {loading ? <div>Loading...</div> : null}
                  {suggestions.map(suggestion => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",

                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}  >
                        {suggestion.description}

                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {address !== "" ? <BiCurrentLocation className='choose-service__location--icon' style={{ display: "block" }} onClick={handleShow} /> : <BiCurrentLocation style={{ display: "none", width: "3rem" }} />}

        </div>
        <button onClick={matchlat} className="btn btn-primary u-margin-bottom-small" style={{ left: "35%" }}>Search</button>
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
                  <NavLink   to={`/orderdetail/${_id}/${coordinates.lat}/${coordinates.lng}/${location.coordinates[0]}/${location.coordinates[1]}`}><button className=" btn btn-order" onClick={() => addrcorder(_id)}>Place Order </button>
                  </NavLink>
                </form>
              </div>
            )
          })
          }
        </div>


        
      </section>
    </div>
  )
}

export default ChooseService

