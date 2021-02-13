var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link, function(data){
  console.log(data);
  var depth = data.features[0].geometry.coordinates[2];
  console.log(depth);
  var mag = data.features[0].properties.mag;
  console.log(mag);
  
 
  var geojsonMarkerOptions = {
    radius: calRadius(),
    fillColor: calcColor(),
    color: '#000000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function calcColor(mag){
//switch statements
switch (true) {
  case mag >= 5:
    return '#00FF00';
  case mag >= 4:
    return "#FF6900";
  case mag >= 3:
    return "#FFC100";
  case mag >= 2:
    return "#E5FF00";
  case mag >= 1:
    return "#8DFF00";
  case mag >= 0:
    return "#FF0000"
  

}};

console.log(calcColor(depth));


function calRadius (depth){
  if (depth === 0) {
    return 1;
  }
  return depth * 4
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
    if (feature.properties && feature.properties.popupContent) {
       layer.bindPopup('WES TEST');
   }
  }   
  
 }).addTo(myMap);




});




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





//  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createmarkers);