// Google Maps variables
let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;

// eslint-disable-next-line no-var
var geocoder;

// eslint-disable-next-line no-unused-vars
function initMap() {
  // Initializing variables
  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();
  currentInfoWindow = infoWindow;
  infoPane = document.getElementById("panel");
  //geocoder
  geocoder = new google.maps.Geocoder();
  // Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 5
        });

        bounds.extend(pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);

        // Display places near the user
        getNearbyPlaces(pos);
        // Call the function
        getData();
      },
      () => {
        // Browser supports geolocation, but user denies permission
        handleLocationError(true, infoWindow);
      }
    );
  } else {
    // Browser doesn't support geolocation
    handleLocationError(false, infoWindow);
  }
}

// If there is a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
  // Set default location to Orlando, Florida
  pos = { lat: 28.5492, lng: -81.3798 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 5,
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

  // Display places in Orlando, Florida
  getNearbyPlaces(pos);
  // Call the function
  getData();
}

// Search for nearby palces
function getNearbyPlaces(position) {
  const request = {
    location: position,
    rankBy: google.maps.places.RankBy.DISTANCE,
    keyword: "museum",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}

// Handle the results of the search
function nearbyCallback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}

// Set a marker at each location
function createMarkers(places) {
  places.forEach((place) => {
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
    });

    // Add click listener to each marker
    google.maps.event.addListener(marker, "click", () => {
      const request = {
        placeId: place.place_id,
        fields: ["name"],
      };
      // Only fetch the details of a place when the user clicks on a marker
      service.getDetails(request, (placeResult, status) => {
        showDetails(placeResult, marker, status);
      });
    });
    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
  });
  // Once all the markers have been placed, adjust the bounds of the map to show all the markers within the visible area.
  map.fitBounds(bounds);
}

// Displays details above the marker
function showDetails(placeResult, marker, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    const placeInfowindow = new google.maps.InfoWindow();
    placeInfowindow.setContent(
      "<div><strong>" + placeResult.name + "</strong></div>"
    );
    placeInfowindow.open(marker.map, marker);
    currentInfoWindow.close();
    currentInfoWindow = placeInfowindow;
    showPanel(placeResult);
  } else {
    console.log("showDetails failed: " + status);
  }
}

// Pull all of the info from the database
function getData() {
  $.get("/api/all/", (data) => {
    if (data) {
      // Check to make sure it pulled correctly
      console.log(data);
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
        geocoder.geocode({ address: cities[i] }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            newAddress = results[0].geometry.location;
            const latlng = new google.maps.LatLng(
              parseFloat(newAddress.lat()),
              parseFloat(newAddress.lng())
            );
            console.log(latlng);
            // gmarkers.push(createMarker(latlng, content[i]));
          }
        });
      }
    }
  });
}
