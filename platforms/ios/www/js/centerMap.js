              // This example adds a search box to a map, using the Google Place Autocomplete
              // feature. People can enter geographical searches. The search box will return a
              // pick list containing a mix of places and predicted search terms.

              // This example requires the Places library. Include the libraries=places
              // parameter when you first load the API. For example:
              // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

              function initAutocomplete() {
                var map = new google.maps.Map(document.getElementById('map'), {
                  center: {
                    lat: 37.556145,
                    lng: 127.073522
                  },
                  zoom: 15,
                  // mapTypeId: 'roadmap',
                  disableDefaultUI: true
                });



                // Create the search box and link it to the UI element.
                var input = document.getElementById('pac-input');
                console.log(input)
                var searchBox = new google.maps.places.SearchBox(input);
                map.controls[google.maps.ControlPosition.TOP].push(input);

                // Bias the SearchBox results towards current map's viewport.
                map.addListener('bounds_changed', function () {
                  searchBox.setBounds(map.getBounds());
                });

                var markers = [];
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                searchBox.addListener('places_changed', function () {
                  var places = searchBox.getPlaces();
                  console.log(places[0].name)
                  if (places.length == 0) {
                    return;
                  }

                  // Clear out the old markers.
                  markers.forEach(function (marker) {
                    marker.setMap(null);
                  });
                  markers = [];

                  // For each place, get the icon, name and location.
                  var bounds = new google.maps.LatLngBounds();
                  places.forEach(function (place) {
                    if (!place.geometry) {
                      console.log("Returned place contains no geometry");
                      return;
                    }
                    var icon = {
                      url: place.icon,
                      size: new google.maps.Size(71, 71),
                      origin: new google.maps.Point(0, 0),
                      anchor: new google.maps.Point(17, 34),
                      scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                      map: map,
                      // icon: icon,
                      title: place.name,
                      position: place.geometry.location
                    }));
     

                    if (place.geometry.viewport) {
                      // Only geocodes have viewport.
                      bounds.union(place.geometry.viewport);
                    } else {
                      bounds.extend(place.geometry.location);
                    }
                  });
                  console.log(markers[0].position.lat(), markers[0].position.lng())

                  C.position[C.peopleIndex] = {
                    lat: markers[0].position.lat(),
                    lng: markers[0].position.lng()
                  };
                  $("#placeString_" + C.peopleIndex).text(places[0].name);
                  C.position[C.peopleIndex].name = places[0].name
                  $("#placeString_d_" + C.peopleIndex).text(places[0].name);
                  map.fitBounds(bounds);
                });
                var map2;
                var infowindow;


                var pyrmont = {
                  lat: -33.867,
                  lng: 151.195
                };

                map2 = new google.maps.Map(document.getElementById('map2'), {
                  center: pyrmont,
                  zoom: 15,
                  disableDefaultUI: true
                });


                infowindow = new google.maps.InfoWindow();

              }



              function findSubway(cPosition) {

                console.log(cPosition)
                var map2;
                var infowindow;
                map2 = new google.maps.Map(document.getElementById('map2'), {
                  center: cPosition,
                  zoom: 15,
                  disableDefaultUI: true
                });

                infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map2);

                service.nearbySearch({
                  location: cPosition,
                  rankBy: google.maps.places.RankBy.DISTANCE,
                  type: ['subway_station']
                }, callback);

                function callback(results, status) {
                  console.log(results)
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    map2 = new google.maps.Map(document.getElementById('map2'), {
                      center: results[0].geometry.location,
                      zoom: 15,
                      disableDefaultUI: true
                    });
                    createMarker(results[0]);

                  }
                }

                function createMarker(place) {
                  var placeLoc = place.geometry.location;
                  var marker2 = new google.maps.Marker({
                    map: map2,
                    position: place.geometry.location
                  });
                  C.centerPosition.name = place.name;
                  infowindow.setContent(place.name);
                  infowindow.open(map2, marker2);
           

                }

              }
