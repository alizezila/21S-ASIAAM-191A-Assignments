let zoomLevel = 5;
const mapCenter = [34.0709,-118.444];

const map = L.map('map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(lat, long, msg, significance){
    console.log(msg, significance)
    L.marker([lat, long]).addTo(map).bindPopup(msg, significance)
    return msg, significance
}

addMarker(34.0709, -118.444, "Powell:", 'Where I work on campus')