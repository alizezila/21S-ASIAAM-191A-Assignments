const map = L.map('map').setView([34.0709, -118.444], 9
        );
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

function addMarker(data){
        // console.log(data)
        // these are the names of our lat/long fields in the google sheets:
        L.marker([data.lat,data.long]).addTo(map).bindPopup(`<h2>${data.wherewasthebestplaceyouvebeencampinghadoutdooradventures}</h2>`)
        // adding our create button function
        createButtons(data.lat,data.long,data.wherewasthebestplaceyouvebeencampinghadoutdooradventures)
        return data.wherewasthebestplaceyouvebeencampinghadoutdooradventures
}

function createButtons(lat,long,title){
        const newButton = document.createElement("button"); // adds a new button
        newButton.id = "button"+title; // gives the button a unique id
        newButton.innerHTML = title; // gives the button a title
        newButton.setAttribute("lat",lat); // sets the latitude 
        newButton.setAttribute("lng",long); // sets the longitude 
        newButton.addEventListener('click', function(){
            map.flyTo([lat,long],14); //this is the flyTo from Leaflet
        })
        const spaceForButtons = document.getElementById("contents")
        spaceForButtons.appendChild(newButton);//this adds the button to our page.
}
 

let url = "https://spreadsheets.google.com/feeds/list/1PyklxDCCB1SKpSUY4cZCEEnYed9ebBvRuXWGGJaZT7E/o57kdav/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)





function formatData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
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
}