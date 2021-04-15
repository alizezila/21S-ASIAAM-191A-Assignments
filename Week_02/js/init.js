const map = L.map('map').setView([34.0709, -118.330], 10);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch("js/lab1.geojson")
	.then(response => {
		return response.json();
		})
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
                        // the leaflet method for adding a geojson
            L.geoJSON(data, {
                style: function (feature) {
                    return {color: 'white'};
                }
            }).bindPopup(function (layer) {
                return layer.feature.properties.place;
            }).addTo(map);
        });

		fetch("js/mymap.geojson")
		.then(response => {
			return response.json();
			})
		.then(data =>{
			// Basic Leaflet method to add GeoJSON data
							// the leaflet method for adding a geojson
				L.geoJSON(data, {
					style: function (feature) {
						return {color: 'white'};
					}
				}).bindPopup(function (layer) {
					return layer.feature.properties.Name;
				}).addTo(map);
			});