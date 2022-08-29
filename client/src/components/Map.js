import {useLoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import "@reach/combobox/styles.css"
import Search from './MapSearch';

const containerStyle = {
    width: '900px',
    height: '600px',
    border: '5px solid blue',
    };

const center = {
    lat:  45.421532,
    lng: -75.697189
};

const libraries = ["places"];
//console.log("places", libraries)

const Map = () => {
    const {isLoaded} = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

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
    },[])

    if(!isLoaded){
        return <h1>Loading</h1>;
        
    }

    return (
        <div>
            <Search panTo={panTo} setSelected={setSelected}/>
            <Locate panTo={panTo}/>
        <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={8}
        onClick={onMapClick} 
        onLoad={onMapLoad}
        >
            {/* {markers.map(marker => 
            < Marker position={{lat: marker.lat, lng:marker.lng}}  
            // icon={{url: ""}}
            onClick={() => {
                setSelected(marker);
            }}
            /> 
            )} */}
            {selected && <Marker position={selected}/>}

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

const Locate = ({panTo}) => {
    const sucess = (position) => {
panTo({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
});
    }

    return(
        <StyledDiv>
        <button className='locate' onClick={() => {
            navigator.geolocation.getCurrentPosition(sucess, () => null)
        }}>
            Locate me
        </button>
        </StyledDiv>
    )
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

