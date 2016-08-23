

var TdxCmd = function (tdx) {

    var self = this;

    self.baseCommandURL = tdx.baseCommandURL;
    self.baseQueryURL = tdx.baseQueryURL;
    self.token = tdx.token;

}


TdxCmd.prototype.getDatasetsBasedOnSchema = function (schemaId, cb) {

    //returns array of dataset objects that match schema id and the token has permission for

    var self = this;
    url = self.baseQueryURL + '/v1/datasets?access_token=' + self.token + '&filter={"schemaDefinition.basedOn":"' + schemaId + '"}';

    return $.ajax({
        type: "GET",
        url: url
    }).error(function (err) {
        cb(err) //todo error handling
    }).done(function (response) {
        cb(null, response);
    }); 

}

TdxCmd.prototype.truncate = function (datasetId, cb) {

    var self = this;
    url = self.baseCommandURL + '/commandSync/resource/truncate';

    var postData = {};
    postData.id = datasetId;

    return $.ajax({
        type: "POST",
        url: url,
        headers: {
            authorization: "Bearer " + self.token
        },
        data: postData
    }).error(function (err) {
        cb(err) //todo error handling
    }).done(function (response) {
        cb(null, response);
    }); 

}


TdxCmd.prototype.addData = function (datasetId, data, cb) {

    //console.log(data)

    var self = this;
    url = self.baseCommandURL + '/commandSync/dataset/data/createMany';

    var postData = {};
    postData.datasetId = datasetId;
    postData.payload = data

    var headers = {};
    headers.authorization = "Bearer " + self.token;

    return $.ajax({
        type: "POST",
        url: url,
        headers: headers,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(postData)
    }).error(function (err) {
        console.log(err)
        cb(err) //todo error handling
    }).done(function (response) {
        //console.log(response)
        cb(null, response);
    });
    
};

TdxCmd.prototype.getDatasetIdData = function (datasetId, cb) {

    var self = this;
    url = self.baseQueryURL + '/v1/datasets/' + datasetId + '/data?access_token=' + self.token

    return $.ajax({
        type: "GET",
        url: url
    }).error(function (err) {
        console.log(err)
        cb(err) //todo error handling
    }).done(function (response) {
        //console.log(response)
        cb(null, response.data);
    });



};

