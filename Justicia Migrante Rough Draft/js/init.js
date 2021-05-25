const map = L.map('map').setView([36.737593086418656, -119.7856438707979], 6
        );
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

function addMarker(data){
        // console.log(data)
        // these are the names of our lat/long fields in the google sheets:
        L.marker([data.lat,data.long]).addTo(map).bindPopup(`<h2>${data.wherewasthebestplaceyouvebeencampinghadoutdooradventures}</h2>${"Enjoyed it? " + data.didyoulikeit} <p>${"Your Story: " + data.optionalshareastoryaboutyourtripifyoudlike}</p>`)
       // L.circle([data.lat,data.long],{ color: 'orange', fillColor: '#f03', fillOpacity: 0.5,  radius: 400 }).addTo(map).bindPopup(`<h2>${data.bestdish}</h2>`+`<p><b>Location:</b>${data.whereisitat}</p>`+`<p><b>Name or Description:</b>${data.name}</p>`+`<p><b>How did you find it:</b>${data.yourstory}</p>`)
     
       // adding our create button function
        createButtons(data.lat,data.long,data.wherewasthebestplaceyouvebeencampinghadoutdooradventures)
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