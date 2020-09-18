let map, marker, infoWindow;

function initMap() {
  let myLatLng = { lat: 20.977299, lng: 105.842444 };
  let iconMyLocal = {
  url: "/images/marker.png",
  size: new google.maps.Size(50, 50),
}; 

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    center: myLatLng,
    zoomControl: false,
    streetViewControl: false,
    scrollwheel: true,
  });

  marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: { url: iconMyLocal.url, scaledSize: iconMyLocal.size },
    draggable: true,
    title: "I am here ! ",
  }); 
  let contentString = "<h1>Content nay ba con oi </h1>"

  infoWindow = new google.maps.InfoWindow({
    content: contentString,
    maxwidth: 300,
  })
  // event click marker show infoWindow
  marker.addListener('click', function () {
    infoWindow.open(map,marker)
  })
  map.addListener("click", function () {
    infoWindow.close();
  });




  // event start && end draggable 
  google.maps.event.addDomListener(marker, 'dragstart', function (e) {
    console.log('Let us go :', e);
  })
  google.maps.event.addDomListener(marker, "dragend", function (e) {
    console.log("New market :", e.latLng.lat(), e.latLng.lng());
    getNewMarket();
    map.setZoom(15)
  });
  // zoomControl
  function ZoomControl() {
    let zoomInButton = document.getElementById("zoom-in");
    let zoomOutButton = document.getElementById("zoom-out");
    google.maps.event.addDomListener(zoomInButton, "click", function () {
      map.setZoom(map.getZoom() + 1);
    });
    google.maps.event.addDomListener(zoomOutButton, "click", function () {
      map.setZoom(map.getZoom() - 1);
    });
  }
    // geolocation Control

    function geolocationControl() {
      let geoButton = document.getElementById("current-location");
      google.maps.event.addDomListener(geoButton, "click", geolocate)
    };
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          marker.setPosition(pos)
        })
      }
    }
  let markers = [
    { lat: 20.999171, lng: 105.839759 },
    { lat: 20.9747293, lng: 105.8412874 },
    { lat: 20.9812029, lng: 105.8282948 },
    { lat: 20.9744155, lng: 105.842445 },
    { lat: 20.987299, lng: 105.842344 },
  ];

  function getNewMarket() {
    markers.forEach(function (market) {
      createMarkers(market);
    })
  }
  function createMarkers(pos) {
    var newMarker = new google.maps.Marker({
      position: pos,
      map: map,
    })
  }
  
  
  ZoomControl();
  geolocationControl();
  
  }
