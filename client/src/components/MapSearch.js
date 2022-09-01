import usePlacesAutocomplete, {getGeocode, getLatLng } from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";

import styled from 'styled-components';

const Search = ({  panTo, markerTest}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "canada" },
            location: { lat: () =>  45.2826,
                lng: () => -75.7471},
                radius: 100 ,
                // types: ["(cities)"],
                // fields:["geometry"]
        },

        debounce: 300
});

    
      const handleSelect =  ({description}) =>  () => {
        setValue(description, false);
        clearSuggestions();
        //console.log(address)
        // const results = await getGeocode({address});
        // const {lat, lng} = await getLatLng(results[0]);
        // setSelected({lat, lng})
      
        getGeocode({address:description})
        .then(results => getLatLng(results[0]))
        .then(({lat,lng}) => {
          panTo({lat,lng})
          console.log(lat,lng)
        })
        .catch(err => {
          console.log(err)
        });
      //   try{
        
      //   const results = await getGeocode({address});
      //   const {lat, lng} = await getLatLng(results[0]);
      //   panTo({lat, lng});
      //   //setSelected({lat, lng})
      //   clearSuggestions();
        
      //   console.log(lat , lng)
      //   }
      //   catch(err){
      //       console.log(err)
      //   }
      };
      const renderSuggestions = () => 

      data.map(suggestion => {
          
         // console.log(suggestion)
          const {
        place_id,

        structured_formatting: { main_text, secondary_text }
      } = suggestion;
        
     
            
      
      
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

    
      return (
        <StyledDiv>
        <Combobox onSelect={handleSelect} >
          <ComboboxInput className='search' value={value} onChange={(e) =>{ 
            setValue(e.target.value)}
          
          
          } 
            disabled={!ready} 
            />
          <ComboboxPopover>
            <ComboboxList>
              {/* {status === "OK" &&
                data.map(({ place_id, description }) => (
                  //<ComboboxOption key={place_id} value={description} />
                ))} */}
                {status === "OK" && <ul>{renderSuggestions()}</ul>}

            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        </StyledDiv>
      );
}

export default Search;


const StyledDiv = styled.div`

.search {
    position: absolute;
    top:  5rem;
    left: 30%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 300px;
    padding: 10px;
    border: none;
    font-size: 15px;
    z-index: 10;
    border-radius: 15px;
    /* border: 2px solid red; */
}


`;