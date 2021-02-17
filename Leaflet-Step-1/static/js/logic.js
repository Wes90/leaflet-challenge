var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link, function(data){
  console.log(data);
  var depth = data.features[0].geometry.coordinates[2];
  console.log(Math.max(depth));
  // var mag = data.;
  console.log(depth);
  
 
  var geojsonMarkerOptions = {
    radius: calRadius(),
    fillColor: calcColor(),
    color: '#000000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


  // Create a legend 
// var legend = L.control({
//   position: "bottomright"
// }).addTo(myMap);


function calcColor(depth){
//switch statements
switch (true) {
  case depth >= 90:
    return "#FF0000";
  case depth >= 70:
    return "#FF6900";
  case  depth >= 50:
    return "#FFC100";
  case depth >= 30:
    return "#E5FF00";
  case depth >= 10:
    return "#8DFF00";
  case depth < 10:
    return "#00FF00";
}};

function calRadius (mag){
  if (mag === 0) {
    return 1;
  }
  return mag * 4
}

function stylefunc (feature) {
   return {
     fillColor: calcColor(feature.geometry.coordinates[2]),
      color: '#000000',
      radius: calRadius(feature.properties.mag),
      opacity: 1,
      fillOpacity: 0.8
   }
  }

L.geoJSON(data, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }, style: stylefunc,
   onEachFeature: function (feature, layer) {
     layer.bindPopup('<h3><h3>Location: ' + feature.properties.place + '<h3><h3>Depth: ' + feature.geometry.coordinates[2] + '<h3><h3>Magnitude: ' + feature.properties.mag + '</h3>');
   }
 }).addTo(myMap);
});

// Create a legend 
// var legend = L.control({
//   position: "bottomright"
// }).addTo(myMap);

var myMap = L.map("map", {
  center: [33.7165, -116.7476667],
  zoom: 5
});
// Adding tile layer to the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(myMap);





