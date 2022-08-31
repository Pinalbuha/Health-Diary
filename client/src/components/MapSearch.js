import usePlacesAutocomplete, {getGeocode, getLatLng } from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";

import styled from 'styled-components';

const Search = ({ setSelected, panTo}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 45.421532,
                lng: () => -75.697189},
                radius: 200 * 1000,
        },
        
    });

    
      const handleSelect = async (address) => {
        setValue(address, false);
        //console.log(address)
        // const results = await getGeocode({address});
        // const {lat, lng} = await getLatLng(results[0]);
        // setSelected({lat, lng})
         

        try{
        
        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]);
        panTo({lat, lng});
        //setSelected({lat, lng})
        clearSuggestions();
        
        console.log(lat , lng)
        }
        catch(err){
            console.log(err)
        }
      };
    
      return (
        <StyledDiv>
        <Combobox onSelect={handleSelect} >
          <ComboboxInput className='search' value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
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