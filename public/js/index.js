// Variables for first two functions
let pos;
let map;
let bounds;
let infoWindow;

// eslint-disable-next-line no-unused-vars
function initMap() {
  // Initializing variables
  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();
  currentInfoWindow = infoWindow;
  infoPane = document.getElementById("panel");

  // Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 2,
        });

        bounds.extend(pos);
        infoWindow.setPosition(pos);
        // Let the user know we found their location
        infoWindow.setContent("Earthling Located");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        // Browser supports geolocation, but user denies permission
        handleLocationError(true, infoWindow);
      }
    );
  }

  // Retrieve the data from the db
  getData();
}

// If there is a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
  // Set default location to Orlando, Florida
  pos = { lat: 28.5492, lng: -81.3798 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 2,
  });

  // If there is an error, let the user know
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Geolocation permissions denied. Using default location."
      : "Error: Your browser doesn't support geolocation."
  );

  infoWindow.open(map);
  currentInfoWindow = infoWindow;
}

// Pull all of the info from the database
function getData() {
  $.get("/api/all/", data => {
    if (data) {
      // Empty array to hold all of the city names
      const cities = [];
      for (let i = 0; i < data.length; i++) {
        // Push every city from every sighting into the array
        cities.push(data[i].city);
      }
      // Log it to make sure it pushed to the array correctly
      console.log(cities);

      // Loop over all cities and get lat/lon
      for (i = 0; i < cities.length; i++) {
        // Use geocoder to get cities' lat/lon
        const geocoder = new google.maps.Geocoder();
        const address = cities[i];
        geocoder.geocode(
          {
            address: address
          },
          (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              // lat/lng variables to store the coordinates generated by Google Maps
              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();
              // Log the data points
              console.log("lat: " + lat, "lng: " + lng);
              // Create a marker for each set of coordinates
              new google.maps.Marker({
                position: {
                  lat: lat,
                  lng: lng
                },
                map,
                // Custom flying saucer icon for the markers
                icon: (src = "../images/alien-icon.png"),
                title: "ALIENS!"
              });
            }
          }
        );
      }
    }
  });
}
