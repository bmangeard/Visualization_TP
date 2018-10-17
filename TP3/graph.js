var map = L.map('map');
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
map.setView([48.864716, 2.349014], 12);
map.addLayer(osm);
var request = new XMLHttpRequest();
// First we get the trafic data
var trafic = [];
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', "https://data.ratp.fr/api/records/1.0/search/?dataset=trafic-annuel-entrant-par-station-du-reseau-ferre-2016&rows=1000", true);
request.onload = function () {
  // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    data.records.forEach(element => {
    trafic.push({name:`${element.fields.station}`, trafic:`${element.fields.trafic}`});
    });
};
// Send request
request.send();
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var station = [];
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', "https://data.ratp.fr/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&rows=1000&facet=stop_name&refine.departement=75", true);
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    data.records.forEach(element => {
    station.push({name:`${element.fields.stop_name.toUpperCase()}`,
        coord: {lat:`${element.fields.stop_lat}`,lon:`${element.fields.stop_lon}`}
        });   
    });
}
// Send request
request.send();
function traficOnClick() {
    var rad = 10;
    var found = 0;
    for(i=0; i<trafic.length; i++){
        for(j=0;j<station.length; j++){
            if((trafic[i].name==station[j].name)&&(found==0)){
                rad = trafic[i].trafic
                found = 1;
                var circle = L.circle((station[j].coord), {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: rad*0.00002
                }).addTo(map);
            }
        }
        found = 0;
    }
};













/* //Example de click sur carte et dessin d'un polygone
var markerTab = [];

map.on('click', onMapClick);
function onMapClick(e) {
    var marker = L.marker(e.latlng).addTo(map);
    markerTab.push([e.latlng.lat, e.latlng.lng]);

}

// Variable d'état
var state = 0;

function polygonDraw(){
    var poly = L.polygon(markerTab, {color:"red"});
    if(state == 0){
        poly.addTo(map);
        map.fitBounds(poly.getBounds());
        state = 1;
    }else{
        //this line empties the array
        map.removeLayer(poly);
        markerTab.length = 0;
        state = 0;
        console.log(markerTab);       
    }   
}*/ 