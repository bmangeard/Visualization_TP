// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var prenomList = [];
var data;
var array = [];
var prenom = "";
var uniqueList = [];
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', "https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_prenoms_2004_a_2012&rows=5000&sort=annee&facet=sexe&facet=annee&facet=prenoms", true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  data.records.forEach(element => {
    prenomList.push(element.fields.prenoms);
    array.push({prenom:`${element.fields.prenoms}`,nombre:`${element.fields.nombre}`,annee:`${element.fields.annee}`});
  })  
  uniqueList = Array.from([...new Set(prenomList)]);
  uniqueList.sort();

  $( function() {
    $( "#tags" ).autocomplete({
      source: uniqueList,
      select: function(event, ui) {
        prenom = ui.item.value;
        var tabAMchart = [];
        for(i=0;i<array.length;i++){
          if(array[i].prenom==prenom){
            tabAMchart.push({nombre : array[i].nombre, annee : array[i].annee});
          }
        }
        var chart = AmCharts.makeChart( "chartdiv", { 
          "type": "serial",
          "theme": "light",
          "dataProvider": [{
            "annee": tabAMchart[0].annee,
            "nombre": tabAMchart[0].nombre
          },{
            "annee": tabAMchart[1].annee,
            "nombre": tabAMchart[1].nombre
          },{
            "annee": tabAMchart[2].annee,
            "nombre": tabAMchart[2].nombre
          },{
            "annee": tabAMchart[3].annee,
            "nombre": tabAMchart[3].nombre
          }],
          "valueAxes": [{
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
          }],
          "gridAboveGraphs": true,
          "startDuration": 1,
          "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "nombre"
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "annee",
          "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20
          },
          "export": {
            "enabled": true
          }
        });
      }     
    });
  });
};
// Send request
request.send();