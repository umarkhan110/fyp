import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
//import { Latlang } from './Useplace'
const Searh = ({ google, locations = [] }) => {
 const { lat, lng } = useParams();
 // console.log(coordinate)
  const [items, setItems] = useState([]);
  const matchlat = async () => {
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
  useEffect(() => {
    matchlat();
    // eslint-disable-next-line
  }, []);

  return <div>
    <div>

      {items.map((elem) => {
        const { _id, shopname } = elem;
        return (
          <div key={_id} >
            <form method="GET">
              {shopname}

            </form>
          </div>
        )
      })
      }

    </div>
    {/* <Map
      google={google}
      style={{ width: "40%", height: "50%", position: "absolute", left: "200px" }}
      initialCenter={{
        lat: lat,
        lng: lng
      }}
      zoom={15}

    ></Map> */}
  </div>;

};

export default Searh
