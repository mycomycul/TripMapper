var map;
var mappingId
(function (d) {
    let file = 'https://maps.googleapis.com/maps/api/js?key=' + googlekey + '&callback=createMap';
    let ref = d.getElementsByTagName('script')[0];
    let js = d.createElement('script');
    js.src = file;
    ref.parentNode.insertBefore(js, ref);
}(document));

function createMap() {
    //Map target, zoom and center required            
    let mapCanvas = document.getElementById('googleMap1');
    let textTarget = document.getElementById('textTarget');
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
    google.maps.event.addListener(map, 'click', function (event) {
        //CreateMarker(map, event.latLng);
        addLocation(map, event.latLng);
    })
    // document.getElementById('rowinfo-' + sectionId).innerHTML = latLng.lng;

}
function addLocation(map, latLng) {
    // alert(latLng.lng() + " " + latLng.lat());
    document.getElementById('row-'+mappingId).setAttribute("data-location",latLng.lng() + " " + latLng.lat());
    document.getElementById('rowinfo-'+mappingId).innerHTML = (latLng.lng() + " " + latLng.lat());

}