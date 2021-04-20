// declare variables
let zoomLevel = 4;
const mapCenter = [39.8282, -98.5696];

// use the variables
const map = L.map('map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`)
    createButtons(lat,lng,title); 
    return message
}

// create a function to add buttons with a fly to command
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 

    // attach an event listner to the button with Leaflet's map.flyTo
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
        zoom = 10;
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}

// use our marker functions
addMarker(40.73602157283994, -73.99738555094657,'Washington Square Park','Manhattan, New York')
addMarker(36.11329640577107, -112.11268368742553,'Grand Canyon','National Park in Arizona')
addMarker(34.129631348789204, -118.11452419999999,'Huntington Library','Library and Botanical Gardens in Pasadena,CA')
addMarker(37.77705092430431, -122.43372246557624,'Alamo Square Park','San Francisco, CA')
addMarker(36.061206030737296, -86.8978909693184, 'Percy Warner Park','Nashville, TN')