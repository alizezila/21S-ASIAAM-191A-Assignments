const map = L.map('map').setView([34.27186947278245, -118.41718638380269], 8.5);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	maxZoom: 90,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);
			
//JavaScript let variable declaration to create a marker
let marker = L.marker([34.27186947278245, -118.41718638380269]).addTo(map)
		.bindPopup('Hope of the Valley Parking Site')
		// .openPopup();
let marker2 = L.marker([34.70382842726976, -118.2345813029235]).addTo(map)
		.bindPopup('Volunteers of America LA Parking Site <br> High Desert MACC Homeless Shelter')
let marker3 = L.marker([34.23658770486618, -118.46844413860401]).addTo(map)
		.bindPopup('North Valley Caring Services <br> Northridge')


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
			return layer.feature.properties.name;
		}).addTo(map);
	});

	function customMarker (feature, latlng) {
		return L.circleMarker(latlng, { color: feature.properties.color })
		}
		
		// create an options object
		let myLayerOptions = {
		pointToLayer: customMarker
		}

fetch("js/lab1.geojson")
.then(response => {
	return response.json();
	})
.then(data =>{
	// Basic Leaflet method to add GeoJSON data
					// the leaflet method for adding a geojson
		L.geoJSON(data, {
			style: function (feature) {
				return {color: 'white'}; // CHANGE THIS // 
			}
		}).bindPopup(function (layer) {
			return layer.feature.properties.name;
		}).addTo(map);
	});