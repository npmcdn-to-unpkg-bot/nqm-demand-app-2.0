
console.log("read map.js")

Map = function (id, map_config) {

    

    var self = this;

    self.id = id;
    self.config = map_config;

    self._initMap();    


}


Map.prototype._initMap = function () {

    console.log("init map")

    var self = this;

    self.map = L.map(self.id).setView(self.config.center, 11);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'lv1903.n7i722bb',
        accessToken: 'pk.eyJ1IjoibHYxOTAzIiwiYSI6IjFiYjk4OGE1M2RiOGYyZjIyNTBjNTViNWQzNDVlMjMxIn0.4xOk3pGWKbBlIwvZK5B-RQ'
    }).addTo(self.map);

    //var osmTileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    //var basemap = new L.TileLayer(osmTileUrl, { maxZoom: 18 });
    //var map = new L.Map('map', {
    //    layers: [basemap],
    //    center: new L.LatLng(50.9, -1.3), zoom: 12
    //});


    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.OpenStreetMap()
    }).addTo(self.map);

}

Map.prototype.getBoundaries = function(boundaryUrl, cb) {

}

Map.prototype.getData = function (dataUrl, cb) {

}

Map.prototype.getAreas = function (areaUrl, cb) {


}


Map.prototype.addTimeSelect = function () {

}

Map.prototype.upateTime = function () {

}


Map.prototype.drawBoundaries = function (boundaryUrl, cb) {

    var self = this;

    $.ajax(boundaryUrl)
        .done(function (res) {

            var style = {
                "color": "#1f78b4",
                "weight": 1,
                "opacity": 0.65
            };

            var onEachFeature = function (feature, layer) {

                //layer.on('mouseover', function (e) {
                //    document.getElementById("entityIdHolder").innerHTML = "<h4>Id: " + feature.properties.LSOA11CD +
                //        "&nbsp;&nbsp;&nbsp;&nbsp; Name: " + feature.properties.LSOA11NM +
                //        "<h4/>"


                //});
                //layer.on('mouseout', function (e) {
                //    document.getElementById("entityIdHolder").innerHTML = ""
                //});

                //layer.on('dblclick', function (e) {

                //    var id = e.target.feature.properties.LSOA11CD;
                //    var name = e.target.feature.properties.LSOA11NM;

                //    var recorderd_added = pb.entities.addEntity({ entityId: id, name: name }, 0);

                //    //alert duplicates

                //    if (recorderd_added) {
                //        ee.emitEvent("entityUpdate")
                //    } else {
                //        webix.alert("This area has already been added");

                //    }


                //});

            };

            var geoJsonLayer = L.geoJson(res.data, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(self.map);

            cb()


        });
}


Map.prototype.drawTotal = function () {


}

Map.prototype.drawTotalDelta = function () {


}

Map.prototype.drawDensity = function () {


}

Map.prototype.drawDensityDelta = function () {


}



    



