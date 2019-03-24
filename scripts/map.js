var map;
var mappingId;
var markers = [];
//Inject google maps script with key provided by external script. This was to prevent me from commiting my API key
(function(d) {
    let file;
  //If an API key isn't provided, use the development API call.
  if (typeof googlekey !== 'undefined') {
    file =
      "https://maps.googleapis.com/maps/api/js?key=" +
      googlekey +
      "&callback=createMap";
  } 
  else {
    file = "https://maps.googleapis.com/maps/api/js?callback=createMap";
  }
  let ref = d.getElementsByTagName("script")[0];
  let js = d.createElement("script");
  js.src = file;
  ref.parentNode.insertBefore(js, ref);
})(document);

function createMap() {
  //Map target, zoom and center required
  let mapCanvas = document.getElementById("googleMap1");
  let textTarget = document.getElementById("textTarget");
  let mapCenter = { lat: 47.4829, lng: -122.2171 };
  let mapZoom = 8;
  let mapOptions = { center: mapCenter, zoom: mapZoom };
  map = new google.maps.Map(mapCanvas, mapOptions);
  let firstPoint = new google.maps.LatLng(47.072174, -123.3334);
  let secondPoint = new google.maps.LatLng(24.545756, -81.812441);

  // CreateMarker(map, mapCenter);
  // CreateLine(map);
  // CreateLine2(map);

  // google.maps.event.addListener(map, 'click', function (event) {
  //     //CreateMarker(map, event.latLng);
  //     mapSection(map, event.latLng);

  // })
}

function mapSection(rowmapbutton, latLng) {
  mappingId = rowmapbutton.id.replace("map-", "");
  google.maps.event.addListener(map, "click", function(event) {
    //CreateMarker(map, event.latLng);
    addLocation(map, event.latLng);
  });
  // document.getElementById('rowinfo-' + sectionId).innerHTML = latLng.lng;
}
//Add location to text input section
function addLocation(map, latLng) {
  // alert(latLng.lng() + " " + latLng.lat());
  //Add data attribute to current row
  document.getElementById("row-" + mappingId).dataset.location =
    latLng.lng() + " " + latLng.lat();
  document
    .getElementById("map-" + mappingId)
    .setAttribute("onclick", "deleteLocation(this)");
  document.getElementById("map-" + mappingId).value = "xMap";
  if (document.getElementById("rowinfo-" + mappingId)) {
    document.getElementById("rowinfo-" + mappingId).innerHTML =
      latLng.lng() + " " + latLng.lat();
  }
  createMarker(latLng);
  google.maps.event.clearListeners(map, "click");
}

//Add AMrker to Map
function createMarker(latLng) {
  var newMarkerPosition = { lng: latLng.lng(), lat: latLng.lat() };
  var newMarker = new google.maps.Marker({
    position: newMarkerPosition,
    title: [mappingId].toString(),
    map: map
  });
  markers.push(newMarker);
  console.log();
}
function deleteLocation(mapButton) {
  let sectionId = mapButton.id.replace("map-", "");
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].title == sectionId) {
      markers[i].setMap(null);
      markers.splice(i, 1);
    }
    document.getElementById("row-" + sectionId).dataset.location = "";
    document
      .getElementById("map-" + sectionId)
      .setAttribute("onclick", "mapSection(this)");
    document.getElementById("map-" + sectionId).value = "Map";
    if (document.getElementById("rowinfo-" + sectionId)) {
      document.getElementById("rowinfo-" + sectionId).innerHTML =
        "Click 'Map' Button and then on the map to set Coordinates";
    }
  }
}
