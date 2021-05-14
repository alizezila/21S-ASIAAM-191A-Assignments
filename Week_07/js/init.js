const map = L.map('map').setView([36.73724014548915, -119.78847179822944], 6);

const url = "https://spreadsheets.google.com/feeds/list/1PyklxDCCB1SKpSUY4cZCEEnYed9ebBvRuXWGGJaZT7E/o57kdav/public/values?alt=json"

let Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
Stadia_OSMBright.addTo(map)

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let Likedit = L.featureGroup();
let Didntlikeit = L.featureGroup();
let Meh = L.featureGroup();

let circleOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

function addMarker(data){
        if(data.didyoulikeit == "Yes 😎"){
            circleOptions.fillColor = "green"
            Likedit.addLayer(L.circleMarker([data.lat,data.long],circleOptions).bindPopup(`<h2>${data.wherewasthebestplaceyouvebeencampinghadoutdooradventures}</h2>${"Enjoyed it? " + data.didyoulikeit}<p>${"Your Story: " + data.shareastoryaboutyourtrip}</p>`))
            createButtons(data.lat,data.long,data.wherewasthebestplaceyouvebeencampinghadoutdooradventures)
        }
        else if(data.didyoulikeit == "Meh.. 🥴"){
                circleOptions.fillColor = "Yellow"
                Meh.addLayer(L.circleMarker([data.lat,data.long],circleOptions).bindPopup(`<h2>${data.wherewasthebestplaceyouvebeencampinghadoutdooradventures}</h2>${"Enjoyed it? " + data.didyoulikeit}<p>${"Your Story: " + data.shareastoryaboutyourtrip}</p>`))
                createButtons(data.lat,data.long,data.wherewasthebestplaceyouvebeencampinghadoutdooradventures)
            }
        else{
            circleOptions.fillColor = "red"
            Didntlikeit.addLayer(L.circleMarker([data.lat,data.long],circleOptions).bindPopup(`<h2>${data.wherewasthebestplaceyouvebeencampinghadoutdooradventures}</h2>${"Enjoyed it? " + data.didyoulikeit}<p>${"Your Story: " + data.shareastoryaboutyourtrip}</p>`))
            createButtons(data.lat,data.long,data.wherewasthebestplaceyouvebeencampinghadoutdooradventures)
        }
        return data.timestamp
    }
    
function createButtons(lat,long,title){
        const newButton = document.createElement("button"); // adds a new button
        newButton.id = "button"+title; // gives the button a unique id
        newButton.innerHTML = title; // gives the button a title
        newButton.setAttribute("lat",lat); // sets the latitude 
        newButton.setAttribute("lng",long); // sets the longitude 
        newButton.addEventListener('click', function(){
            map.flyTo([lat,long],10); //this is the flyTo from Leaflet
        })
        const spaceForButtons = document.getElementById("contents")
        spaceForButtons.appendChild(newButton);//this adds the button to our page.
}
 
function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        Likedit.addTo(map)
        Didntlikeit.addTo(map)
        let allLayers = L.featureGroup([Likedit,Didntlikeit,Meh]);
        map.fitBounds(allLayers.getBounds());        
}
//Leaflet feature group layers//
let layers = {
	"Loved it!": Likedit,
	"Not my cup of tea": Didntlikeit,
        "Mixed feelings...": Meh
}
L.control.layers(null,layers).addTo(map)

