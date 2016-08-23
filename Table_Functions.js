var log = require("debug")("demand-table-functions");

var _ = require('lodash');


module.exports = {


    remove: function (table, uniqueProperties) {

        log(table.data.length)

        _.remove(table.data, function (record) {

            for (var upIndex in uniqueProperties) {

                //get the unique header and value
                var upHeader = uniqueProperties[upIndex].header;
                var upValue = uniqueProperties[upIndex].value;

                //get the record column that matches the unique header
                var col = record.filter(function (obj) {
                    return obj.header == upHeader
                })[0];

                //if the values do not match then it is not to be removed so return false
                if (col.value != upValue) {
                    return false
                } 
            }

            //else remove by returning true
            return true

        })
        return table

    }





}


