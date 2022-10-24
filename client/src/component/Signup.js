import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Modal } from "react-bootstrap"
import Map from './Map';
import logow from "./image/logo-white.png"
import { BiCurrentLocation } from "react-icons/bi"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const Signup = ({ google, locations = [] }) => {
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [address, setAdress] = useState("");
  const [codeg, setCode] = useState('');
  console.log(codeg)
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  //console.log(coordinates)
  const [input, setInput] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    contact: '',
    image: '',
    service: '',
    shopname: '',
    code: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }
  const handleSelect = async value => {
    const result = await geocodeByAddress(value);

    const latlng = await getLatLng(result[0]);
    setAdress(value)
    setCoordinates(latlng)

  }
  const { lat, lng } = coordinates;
  const verify = async (event) => {
    event.preventDefault();
    const { email } = input;
    const res = await fetch('/fypsp/spsignupverify', {
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


  const handleChangeI = (event) => {
    console.log(event.target.files[0]);
    setInput({ ...input, image: event.target.files[0] })
  }
  const handleClick1 = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('fname', input.fname);
    formData.append('lname', input.lname);
    formData.append('contact', input.contact);
    formData.append('email', input.email);
    formData.append('address', address);
    formData.append('password', input.password);
    formData.append('image', input.image, input.image.name);
    formData.append('shopname', input.shopname);
    formData.append('service', input.service);
    formData.append('lng', coordinates.lng);
    formData.append('lat', coordinates.lat);
    formData.append('code', input.code);
    formData.append('codeg', codeg);
    event.preventDefault();
    try {
      const res = await fetch('/fypsp/spsignup/', {
        body: formData,
        method: "POST",
      });
      const data = await res.json();
      //console.log(data.message)
      if (res.status === 422 || !data) {
        window.alert(data.message);
        //console.log("invalid");  
      } else {
        window.alert("Service Provider is Added Successfully");
        history("/splogin")
      }
    } catch (error) {
      console.log("Hostel not added")
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

      <section className="navigation-login">
        <div className="navigation-login__logo">
          <a href='/'><img src={logow}></img></a>
        </div>
        <NavLink to="/loginOption" className="login"><b>LogIn</b></NavLink>
      </section>
      <section className="section-signup">
        <div className="signin-form">

          <h3 className="heading-tertiary u-center-text yellow u-margin-bottom-small">Get aided by our services</h3>
          <form className="form">
            <div className="form__group">
              <input onChange={handleChange} type="text" name="shopname"
                value={input.shopname} className="form__input" placeholder="Shop Name" id="firstname" required />
            </div>
            <div className="l">
              <PlacesAutocomplete
                value={address}
                onChange={setAdress}
                onSelect={handleSelect}>

                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Shop Location',
                        className: 'l-text',
                        id: 'firstname'
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
              <div className='location__icon'></div>
              {address !== "" ? <BiCurrentLocation className='l-icon' style={{ display: "block", color: "white", }} onClick={handleShow} /> : <BiCurrentLocation style={{ display: "none" }} />}
            </div>
            <div className="form__group">
              <select value={input.service} name="service" onChange={handleChange} className="form__input" id="firstname" aria-label="Default select example">
                <option style={{ color: "black" }}>Select Services</option>
                <option style={{ color: "black" }} value="Fuel Provider" >Fuel Provider</option>
                <option style={{ color: "black" }} value="Mechanic" >Mechanic</option>
                <option style={{ color: "black" }} value="Tyre Repairing" >Tyer Repairing</option>
              </select>
            </div>

            <div className="form__group">
              <input onChange={handleChange} type="text" name="fname"
                value={input.fname} className="form__input" placeholder="Firstname" id="firstname" required />
            </div>
            <div className="">
              <input onChange={handleChange} type="text" name="lname"
                value={input.lname} className="form__input" placeholder="Lastname" id="lastname" required />
            </div>
            <div className="form__group">
              <input onChange={handleChange} type="text" name="email"
                value={input.email} className="form__input halftext" placeholder="Email" id="email" required />
             
            </div>
            <button className="btn-verify" onClick={verify}>Verify</button>
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
            <button className="btn login-btn u-margin-bottom-small" type="submit" onClick={handleClick1}>Signup</button>
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

export default Signup



