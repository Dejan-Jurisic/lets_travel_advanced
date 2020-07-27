let platform = new H.service.Platform({
    'apikey': 'sWNmS5SdQU3OtrvFNdHzpndD9ZBT5cwmuFj3N-BkWvs'
});

function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;
    let geocoder = platform.getSearchService(),
        landmarkGeocodingParameters = {
            q: title,
            at: '0,0',
            limit: 1
        };

    geocoder.discover(
        landmarkGeocodingParameters,
        showMap,
        (e) => console.log(e)
    );
}

function showMap(result) {
    let location = result.items[0].position
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map, {
            zoom: 15,
            center: {
                lat: location.lat,
                lng: location.lng
            }
        })
    let parisMarker = new H.map.Marker({
        lat: location.lat,
        lng: location.lng
    });
    map.addObject(parisMarker);

    let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();