
import {LoadScript,Autocomplete, GoogleMap, Marker,Circle,MarkerClusterer, InfoWindow, PlacesService} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import "@reach/combobox/styles.css"

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import usePlacesAutocomplete, {getGeocode, getLatLng } from "use-places-autocomplete";

const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 60px)',
    border: '5px solid blue',
    };

//zoom options
// const options = {
//         disableDefaultUI: true,
//         zoomControl: true
//     };

// MARKER COMPONENT STYLE 
// so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder 
const markerOptions = {   imagePath:     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    };

    //CIRCLE COMPONENT STYLE
const CircleStyles = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 8000, // determines the range of circle
    zIndex: 1,
    };

const libraries = ["places"];

const Map = () => {
    const [selected, setSelected] = useState(null);
    const[center, setCenter] = useState({ lat:  45.2826, lng: -75.7471 })
    const [search, setSearch] = useState("")
    const[array, setArray] = useState("");
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState("")
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
    useEffect(() => {
        fetch(`/api/place/?lat=${center.lat}&lng=${center.lng}`,
        )
        .then(res => res.json())
        .then(data => {setMarkers(data.data.results) })
    }, [center])


    const onSBLoad = (ref) => {
        console.log('hello');
        setArray(ref);
        console.log(search);
    };



    // const {isLoaded} = useLoadScript({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     libraries,
    // });


    // if(!isLoaded){
    //     return <h1>Loading</h1>;
        
    // }


    return (
        <>
        <LoadScript 
            libraries={libraries}
            googleMapsApiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >

            {/* <Search  setSelected={setSelected}/> */}
        <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={center} 
            zoom={13}
            // options={options}  
            >
            <Autocomplete
            
            onLoad={onSBLoad}
            onPlaceChanged={() => {

                setCenter({
                  lat: array.getPlace().geometry.location.lat(),
                  lng: array.getPlace().geometry.location.lng(),
                });
                // console.log(array.getPlace().geometry.location.lat());
                // console.log(array.getPlace().geometry.location.lng());
              }}
            >

                <input
              type='text'
              placeholder='Customized your placeholder'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width:` 240px`,
                height: `32px`,
                padding:` 0 12px`,
                borderRadius:` 3px`,
                boxShadow:` 0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize:` 14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
                }}
            />
            </Autocomplete>
            <Circle center={center} options={CircleStyles}/>
            
            <MarkerClusterer 
            options={markerOptions}

            >
                {(clusterer) => 
                    
                    markers.length &&
                    markers.map((marker, index) => {
                    //console.log(typeof marker.geometry.location.lng)
                    return <div key={index}>
                    <Marker 
                    position={{
                        "lat": marker.geometry.location.lat,
                        "lng": marker.geometry.location.lng
                    }}
                    clusterer = {clusterer}
                    onClick={() => {setSelectedMarker({
                        marker, index
                    })}}
                    >
                    {selectedMarker.index === index  && (
                        <InfoWindow position={{ 
                            "lat": marker.geometry.location.lat,
                            "lng": marker.geometry.location.lng}}

                            >
                                <div>
                                    <h3>{ marker.name}</h3>
                                    <button onClick={handleShow}> Show info</button>

                                </div>

                        </InfoWindow>
                    )}
                    </Marker></div>
                })
                }

            </MarkerClusterer>
            
            {/* {selected && <Marker position={selected} />} */}
            </GoogleMap>

        </LoadScript>

        {/* //Bootstrap modal */}

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            {console.log(selectedMarker)}
          <Modal.Title>{selectedMarker ? selectedMarker.marker.name : ''}</Modal.Title>
          <Modal.Title>{selectedMarker ? "world" : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button variant='secondary' onClick={handleClose}>
            Close
          </button>
          <button variant='primary' onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
      </>
    );

    
}


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

