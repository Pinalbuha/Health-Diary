let map=window.google.maps.Map;
let service =window.google.maps.places.PlacesService;
let infowindow =window.google.maps.InfoWindow;

function createMarker(place) {

    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new window.google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
    window.google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });
  }

const MapTest = () => {

    const initMap = () => {

const sydney = new window.google.maps.LatLng(45.421532, -75.697189);

  infowindow = new window.google.maps.InfoWindow();

  map = new window.google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });

  const request = {
    // query: "Museum of Contemporary Art Australia",
    // fields: ["name", "geometry"],
    location: sydney,
    radius: '500',
    type: ['doctor']
  };

  service = new window.google.maps.places.PlacesService(map);
  service.nearbySearch(
    request,
    (
      results,
      status
    ) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    }
  );

}
initMap();
    return(
        <div >

        </div>
    )
    
}



export default MapTest;