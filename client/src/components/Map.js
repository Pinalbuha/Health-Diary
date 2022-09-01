
import {useLoadScript, GoogleMap, Marker, InfoWindow, PlacesService} from '@react-google-maps/api';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import "@reach/combobox/styles.css"
import Search from './MapSearch';
// import usePlacesAutocomplete, {getGeocode, getLatLng } from "use-places-autocomplete";

const containerStyle = {
    width: '900px',
    height: '600px',
    border: '5px solid blue',
    };
    const options = {
        disableDefaultUI: true,
        zoomControl: true
      };
const center = {
    lat:  45.2826,
    lng: -75.7471

};

let service;
//const google = window.google
const libraries = ["places"];
//console.log("places", libraries)

console.log("google",window.google)
const Map = () => {
    console.log("google",window.google)
    const {isLoaded} = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    
   const [markers, setMarkers] = useState([]);
   const [selected, setSelected] = useState(null);
    console.log(markers)

    const onMapClick = useCallback((e) => {
        setMarkers(current => [...current,{
            lat: e.latLng.lat(),
            lng:e.latLng.lng()
        }])
    }, []);
    
   

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])



    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
        let map = mapRef.current;
        console.log(map)

    let request = {
      location: { lat, lng },
      radius: "100",
        type: ['doctor']
    };

    service = new window.google.maps.places.PlacesService(mapRef.current);
    console.log("service",service)
    service.nearbySearch(request, callback);
    function callback(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          console.log("place",place)
           const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map
          });
          console.log(marker)
          setMarkers([marker,...markers])
        }
      }
    }
   },[])

    
    // let request = {
    //     location: center,
    //     radius: "100",
    //       type: ['doctor']
    //   };
  
    //   service = new window.google.maps.places.PlacesService(mapRef.current);
    //   console.log("service",service)
    //   service.nearbySearch(request, callback);
    //   function callback(results, status) {
    //     if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
    //       for (let i = 0; i < results.length; i++) {
    //         let place = results[i];
    //         console.log("place",place)
    //          //createMarker(place)
    //         //console.log(marker)
    //         //setMarkers([marker,...markers])
    //       }

    //     }
    // }

    

    if(!isLoaded){
        return <h1>Loading</h1>;
        
    }
    
   


    return (
        <div>
            {/* <Search panTo={panTo} markerTest={onMapClick}/>
            <Locate panTo={panTo}/> */}
        <GoogleMap 
        id ="map"
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={8}
        onClick={onMapClick} 
        options={options}
        onLoad={onMapLoad}
        >
            {/* {
            markers.map(marker => 
               { console.log("marker",marker)
                return( < Marker position={{lat: marker.lat, lng:marker.lng}} 

            // icon={{url: ""}}
            onClick={() => {
                setSelected(marker);
            }}
            /> )}
            )} */}

            {selected ? <InfoWindow position={{lat:selected.lat, lng:selected.lng}} onCloseClick={() => {
                setSelected(null);
            }} > 
                 <div>
                    <h1>Doctor</h1>
                    
                </div>
            </InfoWindow> : null}


                </GoogleMap>

                </div>
    );


}

// const createMarker = (place) => {
//     if (!place.geometry || !place.geometry.location) return;
//     const marker = new window.google.maps.Marker({
//         map:mapRef.current,
//         position: place.geometry.location,
//       });
// }


// const Locate = ({panTo}) => {
//     const sucess = (position) => {
// panTo({
//     lat: position.coords.latitude,
//     lng: position.coords.longitude,
// });}
    

//     return(
//         <StyledDiv>
//         {/* <button className='locate' onClick={() => {
//             navigator.geolocation.getCurrentPosition( () => null)
//         }}> */}
//             Locate me
//         {/* </button> */}
//         </StyledDiv>
//     )

// }



export default Map;


const StyledDiv = styled.div`

.locate {
    position: absolute;
    top:  5rem;
    right: 50rem;
    background: white;
    z-index: 10;
    border-radius: 15px;
    padding: 10px;
    /* border: 2px solid red; */
}


`;

