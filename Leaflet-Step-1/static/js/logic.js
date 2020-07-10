


// BASE MAP
var myMap = L.map("map", {
        center: [34.052235, -118.243683],
        zoom: 4
    })


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);


// CHOOSE COLOR FUNCTION
 var color = function color(magnitud) {
        if(magnitud >= 5) {
            return "#EE6C6E" //red
            }
        else if(magnitud >= 4) {
            return "#EFA770" // orange
            }
        else if (magnitud >= 3) {
            return "#F2B957" //orange-yellow
            }
        else if (magnitud >= 2){
            return "#F2DA5A" // yellow
            }
        else if (magnitud >= 1){
            return "#E1F15B" //green-yellow
            }
        else if (magnitud >= 0){
            return "#B9F15A" //green
            }       
        }

///CIRCLES STYLE FUNCTION
function geojsonMarkerOptions (feature) {    
    return {
    radius: (feature.properties.mag * 6),
    fillColor: color(feature.properties.mag),
    color: color(feature.properties.mag),
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
    }
};

//LEGEND 
var info = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(myMap);



document.querySelector(".legend").innerHTML = [
    '<img alt="legend" src="static/image/legend.png" width="100" height="120" />'
  ].join("");

////// DATA CALL ////        
var usgurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(usgurl, function(data){
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions(feature));
            },
        onEachFeature: function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.properties) {
                layer.bindPopup( "Magnitud: " + feature.properties.mag 
                            + "<br> Place: " + feature.properties.place
                             + "<br> Time: " + feature.properties.time) };
            }
        
    }).addTo(myMap);

});
