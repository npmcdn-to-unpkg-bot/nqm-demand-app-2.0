

var dummyData = {

    geography: [
        { id: "E1", name: "N1", ratio: 0.5, locked: true },
        { id: "E2", name: "N2", ratio: 0.5, locked: true }
    ],


    population: [
        { year: "2015", persons: 500},
        { year: "2016", persons: 1000},
        { year: "2017", persons: 1500},


    ],

    demography: [
        { age_band:  "0-4", gender:  "female", ratio: 0.0650319829424307, locked: false },
        { age_band:  "10-14", gender:  "female", ratio: 0.0810234541577825, locked: false },
        { age_band:  "15-19", gender:  "female", ratio: 0.0831556503198294, locked: false },
        { age_band:  "20-24", gender:  "female", ratio: 0.0618336886993603, locked: false },
        { age_band:  "25-29", gender:  "female", ratio: 0.0735607675906183, locked: false },
        { age_band:  "30-34", gender:  "female", ratio: 0.0628997867803838, locked: false },
        { age_band:  "35-39", gender:  "female", ratio: 0.0639658848614073, locked: false },
        { age_band:  "40-44", gender:  "female", ratio: 0.0746268656716418, locked: false },
        { age_band:  "45-49", gender:  "female", ratio: 0.0863539445628998, locked: false },
        { age_band:  "5-9", gender:  "female", ratio: 0.0692963752665245, locked: false },
        { age_band:  "50-54", gender:  "female", ratio: 0.0639658848614073, locked: false },
        { age_band:  "55-59", gender:  "female", ratio: 0.0671641791044776, locked: false },
        { age_band:  "60-64", gender:  "female", ratio: 0.0565031982942431, locked: false },
        { age_band:  "65-69", gender:  "female", ratio: 0.0415778251599147, locked: false },
        { age_band:  "70-74", gender:  "female", ratio: 0.0437100213219616, locked: false },
        { age_band:  "75-79", gender:  "female", ratio: 0.0319829424307036, locked: false },
        { age_band:  "80-84", gender:  "female", ratio: 0.0191897654584222, locked: false },
        { age_band:  "85-89", gender:  "female", ratio: 0.0213219616204691, locked: false },
        { age_band:  "90+", gender:  "female", ratio: 0.00533049040511727, locked: false },
        { age_band:  "0-4", gender:  "male", ratio: 0.0646123260437376, locked: false },
        { age_band:  "10-14", gender:  "male", ratio: 0.0685884691848907, locked: false },
        { age_band:  "15-19", gender:  "male", ratio: 0.0795228628230616, locked: false },
        { age_band:  "20-24", gender:  "male", ratio: 0.0785288270377734, locked: false },
        { age_band:  "25-29", gender:  "male", ratio: 0.0487077534791252, locked: false },
        { age_band:  "30-34", gender:  "male", ratio: 0.0556660039761431, locked: false },
        { age_band:  "35-39", gender:  "male", ratio: 0.0556660039761431, locked: false },
        { age_band:  "40-44", gender:  "male", ratio: 0.047713717693837, locked: false },
        { age_band:  "45-49", gender:  "male", ratio: 0.0695825049701789, locked: false },
        { age_band:  "5-9", gender:  "male", ratio: 0.0685884691848907, locked: false },
        { age_band:  "50-54", gender:  "male", ratio: 0.0636182902584493, locked: false },
        { age_band:  "55-59", gender:  "male", ratio: 0.0516898608349901, locked: false },
        { age_band:  "60-64", gender:  "male", ratio: 0.0526838966202783, locked: false },
        { age_band:  "65-69", gender:  "male", ratio: 0.0387673956262425, locked: false },
        { age_band:  "70-74", gender:  "male", ratio: 0.0347912524850895, locked: false },
        { age_band:  "75-79", gender:  "male", ratio: 0.0308151093439364, locked: false },
        { age_band:  "80-84", gender:  "male", ratio: 0.0139165009940358, locked: false },
        { age_band:  "85-89", gender:  "male", ratio: 0.00795228628230616, locked: false },
        { age_band:  "90+", gender:  "male", ratio: 0.00099403578528827, locked: false }
    ]





};

var DataObj = function (tdx, o, cb) {

    var self = this;

    self.table = o.table;
    self.schema = o.schema;

    self.tdx = tdx;
    self.tc = new TdxCmd(self.tdx);

    self._init(cb);

};

DataObj.prototype._init = function (cb) {

    var self = this;


    self.tc.getDatasetsBasedOnSchema(self.schema, function (err, response) {

        if (err) {

            self._errorHandle(err, function (errResponse) {
                console.log(errResponse)
            })

        } else {

            //todo deal with multiple dataset response

            self.datasetId = response[0].id

            //console.log(self.datasetId);

            //load init data to tdx - todo remove this 
           //self._uploadInitData(function (err, response) {

            //    console.log(response)


            self.getData(function (err, data) {
                if (err) {
                    cb(err)
                    console.log(err);
                } else {
                    cb(err, data)
                }
            })

            //});

        }
    })
};

DataObj.prototype.getData = function (cb) {

    var self = this;

    self.tc.getDatasetIdData(self.datasetId, function (err, response) {

        if (err) {

            self._errorHandle(err)

            cb(err)
            //console.log(err);
        } else {
            //console.log(response)
            cb(err, response)
        }
    })
};



DataObj.prototype._uploadInitData = function (cb) {

    var self = this;

    var data = dummyData[self.table];

    console.log(data[0].age_band)

    self.tc.truncate(self.datasetId, function (err, response) {

        if (err) {
            cb(err)
            console.log(err);
        } else {

            self.tc.addData(self.datasetId, data, function (err, response) {

                if (err) {
                    cb(err)
                    console.log(err);
                } else {

                    //console.log("add data response:")
                    //console.log(response)

                    cb(null, "success")
                }
            })
        }
    })
};


//DataObj.prototype.validateRow = function (row, data) {



//};


DataObj.prototype.validateCell = function (header, val, data) {


};



DataObj.prototype._errorHandle = function (err, cb) {

    console.log(err)

    if (err.status == 401) { //todo check what err property to use

        console.log(window.location.href)

        cb("attempt re-authorise")

        window.location = "/login?return=" + window.location.href

        
    }

    cb(err)
}