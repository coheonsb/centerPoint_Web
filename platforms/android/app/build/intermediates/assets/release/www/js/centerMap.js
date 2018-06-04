function initAutocomplete() {
  C.map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 37.56,
      lng: 126.97
    },
    zoom: 15,
    disableDefaultUI: true
  });
  var infowindow;
  infowindow = new google.maps.InfoWindow();
  var input = document.getElementById('pac-input');
  console.log(input)
  var searchBox = new google.maps.places.SearchBox(input);
  C.map.controls[google.maps.ControlPosition.TOP].push(input);

  C.map.addListener('bounds_changed', function () {
    searchBox.setBounds(C.map.getBounds());
  });
  var geocoder = new google.maps.Geocoder;
  if( C.map.markers != undefined){
    removeMarkers();
  }
  C.map.markers = [];
  C.map.addListener('click', function (e) {
    C.map.markers.push(new google.maps.Marker({
      map: C.map,
      position: e.latLng
    }));
    C.map.panTo(e.latLng);
    geocoder.geocode({'location': e.latLng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          C.position[C.peopleIndex] = {
            lat: C.map.markers[0].position.lat(),
            lng: C.map.markers[0].position.lng()
          };
          $("#placeString_" + C.peopleIndex).text(results[1].address_components[1].short_name +" "+ results[1].address_components[0].short_name
        );
          C.position[C.peopleIndex].name = results[1].address_components[1].short_name +" "+ results[1].address_components[0].short_name
          
          $("#placeString_d_" + C.peopleIndex).text(results[1].address_components[1].short_name +" "+ results[1].address_components[0].short_name
        );
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });


  });
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();
    console.log(places[0].name)
    if (places.length == 0) {
      return;
    }
    if( C.map.markers != undefined){
      removeMarkers();
    }
    C.map.markers=[];
    C.map.markers.forEach(function (marker) {
      C.map.marker.setMap(null);
    });
    
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

      C.map.markers.push(new google.maps.Marker({
        map: C.map,
        title: place.name,
        position: place.geometry.location
      }));
      infowindow.setContent(place.name);
      infowindow.open(C.map, C.map.markers[0]);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    console.log(C.map.markers[0].position.lat(), C.map.markers[0].position.lng())

    C.position[C.peopleIndex] = {
      lat: C.map.markers[0].position.lat(),
      lng: C.map.markers[0].position.lng()
    };
    $("#placeString_" + C.peopleIndex).text(places[0].name);
    C.position[C.peopleIndex].name = places[0].name
    $("#placeString_d_" + C.peopleIndex).text(places[0].name);
    C.map.fitBounds(bounds);
  });
  C.map2;
  var infowindow;


  var pyrmont = {
    lat: 37.56,
    lng: 126.97
  };

  C.map2 = new google.maps.Map(document.getElementById('map2'), {
    center: pyrmont,
    zoom: 15,
    disableDefaultUI: true
  });


  infowindow = new google.maps.InfoWindow();

}



function findSubway(cPosition) {

  console.log(cPosition)
  C.map2;
  var infowindow;
  C.map2 = new google.maps.Map(document.getElementById('map2'), {
    center: cPosition,
    zoom: 15,
    disableDefaultUI: true
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(C.map2);

  service.nearbySearch({
    location: cPosition,
    rankBy: google.maps.places.RankBy.DISTANCE,
    type: ['subway_station']
  }, callback);

  function callback(results, status) {
    console.log(results)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      C.map2 = new google.maps.Map(document.getElementById('map2'), {
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
      map: C.map2,
      position: place.geometry.location
    });
    C.centerPosition.name = place.name;
    infowindow.setContent(place.name);
    infowindow.open(C.map2, marker2);


  }

}

function removeMarkers(){
  for(var i=0; i<C.map.markers.length; i++){
    C.map.markers[i].setMap(null);
  }
}


function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}