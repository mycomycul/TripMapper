
        (function(d){
            var file = 'https://maps.googleapis.com/maps/api/js?key='+ googlekey +'&callback=createMap';
            var ref = d.getElementsByTagName('script')[0];
            var js = d.createElement('script');
            js.src = file;
            ref.parentNode.insertBefore(js, ref);
        }(document));

        function createMap() {
            //Map target, zoom and center required            
            var mapCanvas = document.getElementById('googleMap1');
            var textTarget = document.getElementById('textTarget');
            var mapCenter = { lat: 47.4829, lng: -122.2171 };
            var mapZoom = 8;
            var mapOptions = { center: mapCenter, zoom: mapZoom };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            var firstPoint = new google.maps.LatLng(47.072174, -123.3334);
            var secondPoint = new google.maps.LatLng(24.545756,-81.812441);

            CreateMarker(map, mapCenter);
            CreateLine(map);
            CreateLine2(map);

            google.maps.event.addListener(map, 'click', function (event) {
                //CreateMarker(map, event.latLng);
                AddTextSection(map, event.latLng);

            })


        }

        function mapSection(map, latLng) {

            textTarget.innerHTML = textTarget.innerHTML.substring(0,textTarget.selectionStart) + 
                                latLng.lat().toFixed(5) + textTarget.innerHTML.substring(textTarget.selectionEnd,textTarget.length-1);

       }