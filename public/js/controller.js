

var Controller = function(config){

    var self = this;

    self.config = config;

    self.state = {
        map_data_type: null, //fron total | total_delta | density | density_delta
        year: null,
        year_range: null,
        area_id: null,
        filter: {
            area_id: [],
            age_band: [],
            gender: []
        } 
    };

    self.geoJson = null;

    self.map_data = {
        total: [],
        total_delta: [],
        density: [],
        density_delta: [],
        area_demographics: {},
        area_timeseries: {}
    };

    self.map_data_cache = {};


}

Controller.prototype._getData = function () {

};