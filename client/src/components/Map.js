
import {LoadScript,Autocomplete, GoogleMap, Marker,Circle,MarkerClusterer, InfoWindow, PlacesService} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import "@reach/combobox/styles.css"
import Modal from "react-bootstrap/Modal";
import {GiHealthIncrease} from "react-icons/gi"


const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 60px)',
   
    };

//zoom options
// const options = {
//         disableDefaultUI: true,
//         zoomControl: true
//     };


// MARKER COMPONENT STYLE 
// so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder 
const markerOptions = { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' };

//CIRCLE COMPONENT STYLE
const CircleStyles = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    // fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 8000, // determines the range of circle
    zIndex: 1,
    };

const libraries = ["places"];

//map function
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
    const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
    //Fetching places data
    useEffect(() => {
        fetch(`/api/place/?lat=${center.lat}&lng=${center.lng}`)
        .then(res => res.json())
        .then(data => {setMarkers(data.data.results) })
    }, [center])


    const onSBLoad = (ref) => {
        console.log('hello');
        setArray(ref);
        console.log(search);
    };
    console.log(markers)
    

    return (
        <>
        <LoadScript 
            libraries={libraries}
            googleMapsApiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >

        <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={center} 
            zoom={12}
            // options={options}  
        >
        <Autocomplete
            onLoad={onSBLoad}
            onPlaceChanged={() => {
            setCenter({
                lat: array.getPlace().geometry.location.lat(),
                lng: array.getPlace().geometry.location.lng(),
                });
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
                marginTop: '5px'
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
                    return <div key={index}>
                       {/* { console.log(marker.photos[0].photo_reference)} */}
                        <Marker 
                            position={{
                                "lat": marker.geometry.location.lat,
                                "lng": marker.geometry.location.lng,
                                
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
                                    <StyledDiv>
                                        
                                        <h3>{ marker.name}</h3>
                                        
                                        <div className='markerdiv'>
                                            {
                                                marker.photos === undefined ? "No Photos Available" : 
                                                <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${marker.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&maxwidth=400&maxheight=400`}/>
                                            }
                                        </div>
                                        <div className='markerdiv'> 
                                        {marker.rating ===  undefined ? " No Ratings Yet" :  `${marker.rating}  stars`}
                                        </div>
                                        <div className='markerdiv'>
                                        {marker.user_ratings_total ===  undefined ? " No Reviews Yet" :  `${marker.user_ratings_total}  Reviews`}
                                            </div>

                                        <p></p>
                                        <button className='button' onClick={handleShow}> Show info</button>
                                    </StyledDiv>
                                </InfoWindow>
                            )}
                        </Marker></div>
                })
            }

        </MarkerClusterer>
        </GoogleMap>
        </LoadScript>

        {/* //Bootstrap modal */}
        
        <Modal show={show} onHide={handleClose} >
        <ModalHead>
        <Modal.Header closeButton>
            <ModalDiv>
            {/* {console.log(selectedMarker)} */}
            {/* Image */}
                <Modal.Title>{selectedMarker ? selectedMarker.marker.name : ''}</Modal.Title>
            </ModalDiv>
        </Modal.Header>
        <ModalBodyDiv>
        <Modal.Body>{selectedMarker ? selectedMarker.marker.vicinity : ''}</Modal.Body>
        <Modal.Body>{selectedMarker && 
        <div>
            {
                selectedMarker.marker.opening_hours === undefined ? "" :
                selectedMarker.marker.opening_hours.open_now === false ? ' Closed Now' : 'Open Now'
            }
        </div>
}
            
            </Modal.Body> 
            {/* <Modal.Body>
                {selectedMarker && 
                <div>
                    {
                selectedMarker.photos === undefined ? "No Photos Available" : 
            <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${selectedMarker.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&maxwidth=400&maxheight=400`}/>
                    }
        </div>}
        </Modal.Body> */}

        </ModalBodyDiv>
        
        <Modal.Footer>
            <ModalButton>
            <button className='button' onClick={handleClose}>
                Close
            </button>
            {/* <button onClick={handleClose}>
            Save Changes
            </button> */}
            </ModalButton>
        </Modal.Footer>
        </ModalHead>
        </Modal>
        
        </>
    );
}

export default Map;

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
height:250px;
width:200px;
font-size: 12px;
gap: 3px;

img{
    width: 200px;
    height: 150px;
}

.button{
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: green;
    color:white;
    width: 80px;
}

.markerdiv{
font-size:15px;
font-weight: bold;
}



`;

const ModalDiv = styled.div`


/* padding:10px; */
font-size: 25px;
display: flex;
align-items: center;
justify-content: center;

`;

const ModalBodyDiv = styled.div`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
/* width:500px;
height: 100px; */
gap:5px;
/* padding:10px; */
font-size: 20px;


.image{
    height: 250px;
    width: 350px;
}
`;

const ModalHead = styled.div`

height:300px;
background-color: whitesmoke;
padding:15px;
width:400px;
position: absolute;
top: 250px;
left:550px;
display: flex;
flex-direction: column;
color: black;
border-radius: 15px;
`;

const ModalButton = styled.div`
display: flex;
color:red;
border: none;
align-items: center;
justify-content: center;

.button{
    display: flex;
color:red;
border: none;
padding: 10px;
font-size: 20px;
border-radius: 15px;
}
`;