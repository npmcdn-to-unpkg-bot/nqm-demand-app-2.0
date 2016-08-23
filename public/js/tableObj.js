
Table = function (tdx, o) {

    var self = this;

    self.table = o.table;
    self.headers = o.headers;
    self.divId = o.divId;


    self.$table = $(o.divId);


    if (o.addId) {

        //if there is an add button give add function
        self.$addBtn = $(o.addId);
        self.$addBtn.click(self._addBlankRow.bind(this));

        //and if you can add you can remove
        self.remove = true; //flag to add remove button on row

    }


    self._addHeaders();

    self.dataObj = new DataObj(tdx, o, function (err, data) {

        self.tdxData = data

        self._convertToTableFormat()

        console.log(self.data)

        self._writeData();
        //console.log(self._readData())

    }) 
};

Table.prototype._addHeaders = function () {

    var self = this;

    var $head = $("<thead/>");
    var $headerRow = $("<tr/>");

    for (var colIndex in self.headers) {

        var headId = self.divId.substring(1) + self.headers[colIndex].header;

        $headerRow.append($('<th id=' + headId + ' />').html(self.headers[colIndex].text))

    }

    $head.append($headerRow)
    self.$table.append($head)
    self.$table.append($("<tbody/>"))

};

Table.prototype._writeData = function () {

    var self = this;

    self._removeAllRows(true);

    for (var i = 0 in self.data) {
        self._writeRow(self.data[i]);
    }
};

Table.prototype._addBlankRow = function () {


    var self = this;

    var record = {};

    for (var columnId in self.headers) {

        //var col = {};
        var header = self.headers[columnId].header;
        var val;

        var colType = self.headers[columnId].type;


        if (colType == "string") { val = "" };
        if (colType == "number") { val = null };
        if (colType == "lock") { val = false };

        record[header] = val;

    }
    
    self._writeRow(record);

};

Table.prototype._writeRow = function (record) {

    //console.log(record)

    var self = this;

    var rowId = "row" + (new Date()).getTime();

    var $row = $('<tr id=' + rowId + '/>');

    //for (var key in record) {

    //    var metaData = self.headers.filter(function (obj) {
    //        return obj.header == key;
    //    })[0]


    for (var i in self.headers) {

        var key = self.headers[i].header;
        var metaData = self.headers[i]

        //console.log(self.table)
        //console.log(key, metaData)

        var headId = self.divId.substring(1) + metaData.header;

        if (metaData.type == "lock") {

            var checked = "";
            if (record[key]) { checked = "checked" };
            var lockId = "lockbox" + (new Date()).getTime();
            $row.append($('<td class=.lockbox headers=' + headId + '><input type="checkbox" id=' + lockId + ' ' + checked + ' /><label for=' + lockId + '><i class="right material-icons lock">lock</i><i class="right material-icons lockopen">lock_open</i></label></td>'))

        } else if (metaData.editable) {
            $row.append($('<td contenteditable="true" headers="' + headId + '" />').html(record[key]))
        } else {
            $row.append($('<td headers="' + headId + '"/>').html(record[key]))
        }

    }

    //add remove button if required
    if (self.remove) {
        $row.append($('<td><span class="table-remove" id="table-remove' + rowId + '" ><i class="material-icons">clear</i></span></td>'));
    }

    self.$table.append($row)

    //activate remove button
    if (self.remove) {
        $('#table-remove' + rowId).click(self._removeRow.bind(self, rowId));
    }


    //listen for changes
    $(self.divId + " #" + rowId + " td")
        // When you click on item, record into data("initialText") content of this item.
        .focus(function () {
            $(this).data("initialText", $(this).html());
        })
        // When you leave an item...
        .blur(function () {
            // ...if content is different...
            if ($(this).data("initialText") !== $(this).html()) {
                self._tableChange(rowId);
            }
        });

    //listen for changes in the lockboxes
    $(self.divId + " #" + rowId + " input").change(self._tableChange.bind(self, rowId ))


};

Table.prototype._tableChange = function (rowId) {

    var self = this;



    var validRatio = self._normaliseRatios()

    console.log("valid ratio: " + validRatio)

    var headId = self.divId.substring(1) + "ratio";
    if (validRatio) {
        $("td[headers=" + headId + "]").removeClass("invalidRatio")
    } else {
        $("td[headers=" + headId + "]").addClass("invalidRatio")
        Materialize.toast("ratios must sum to 1", 4000, 'tableAlert')
    }




    //validate types
    var $rows = $(self.divId + " tr");

    //console.log($rows)

    //start on row 1 (row 0 = headers)
    for (rowIndex = 1; rowIndex < $rows.length; rowIndex++) {


        var rowId = $rows[rowIndex].id;

        var row = self._readRow(rowId)

        //console.log(row)

        for (var headerIndex in self.headers) {

            var col = self.headers[headerIndex]; 
            var headId = self.divId.substring(1) + col.header;

            //console.log(col)

            //validate numbers
            var rType = typeof (row[col.header]);
            var validType = true;     

            //if (col.type == "string" && rType != "string"){
            //    validType = false;
            //}

            if (col.type == "number" && rType != "number") {
                validType = false;
            }


            if (col.type == "ratio" && rType != "number") {
                validType = false;
            }

            //console.log(col.header, validType)

            if (validType == false) {
                $("#" + rowId + " td[headers=" + headId + "]").addClass("invalidType")
                Materialize.toast(col.text + " must be a " + col.type, 4000, 'tableAlert')
            } else {
                $("#" + rowId + " td[headers=" + headId + "]").removeClass("invalidType")
            }

        }

    } 


    ////validate unique todo

};

Table.prototype.totalRatio = function () {
    var self = this;

    var total = 0;
    var locked = 0;
    var unlocked = 0;

    var totalCount = 0
    var lockedCount = 0;
    var unlockedCount = 0;

    for (dataIndex in self.data) {

        if (!isNaN(self.data[dataIndex].ratio)) { //only add valid numbers 

            total += self.data[dataIndex].ratio;
            totalCount ++

            if (self.data[dataIndex].locked) {
                locked += self.data[dataIndex].ratio;
                lockedCount ++
            } else {
                unlocked += self.data[dataIndex].ratio;
                unlockedCount ++
            }
        }
    }

    var valid = true;
    if (total != 1) { valid = false }

    return { valid: valid,  total: total, locked: locked, unlocked: unlocked, totalCount: totalCount, lockedCount: lockedCount, unlockedCount: unlockedCount}

}

Table.prototype._normaliseRatios = function () {

    //normalises the ratio data and returns valid boolean - valid if equal to 1

    var self = this;

    self._readData(); 

    var ratios = self.totalRatio();

    for (var i in self.data) {
        if (self.data[i].type != "ratio") {
            //if records do not have ratio property return valid ratio
            return true
        } else {
            if (!self.data[i].locked) { //only update unlocked records 
                self.data[i].ratio = self.data[i].ratio / ratios.unlocked * (1 - ratios.locked);
            }
        }
    }

    self._writeData();

    console.log(ratios)

    return self.totalRatio().valid


};

Table.prototype._readData = function () {

    //console.log("read table")

    var self = this;

    var data = [];
    
    var $rows = $(self.divId + " tr");

    //console.log($rows)

    //start on row 1 (row 0 = headers)
    for (rowIndex = 1; rowIndex < $rows.length; rowIndex++) {
        var rowId = $rows[rowIndex].id;
        //console.log(rowId)       
        data.push(self._readRow(rowId));
    }

    self.data = data;
    self._convertToTdxFormat();

};

Table.prototype._readRow = function (rowId) {

    var self = this;

    var columns = self.headers;

    var row = {};

    for (colIndex in columns) {

        var headId = self.divId.substring(1) + columns[colIndex].header
        var val;
                
        if (columns[colIndex].type == "lock") { //if it is a lockbox read checkbox
            val = $("#" + rowId + " td[headers=" + headId + "] input:checkbox:checked").length
        } else { //read html
            val = $("#" + rowId + " td[headers=" + headId + "]").html();
        }
        //console.log(val)

        //if possible convert to number
        if (!isNaN(Number(val)) ) { val = Number(val)}
        row[columns[colIndex].header] = val;
    }

    //console.log(row)
    return row



};

Table.prototype._removeAllRows = function (keepData) {

    //set keepData true to only remove the line from the table but not the data object

    var self = this;

    var $rows = $(self.divId + " tbody tr");

    if ($rows.length == 0) { return}

    for (var rowIndex = 0; rowIndex < $rows.length; rowIndex++) {
        var rowId = $rows[rowIndex].id;
        self._removeRow(rowId, keepData)
    } 

}

Table.prototype._removeRow = function (rowId, keepData) {

    //set keepData true to only remove the line from the table but not the data object


    var self = this;

    //console.log(this.unique)
    //console.log(rowId)

    ////get list of values of unique properties to identifiy which record to delete on the server
    //var uniqueProperties = []
    //for (var uniqueIndex in self.unique) {
    //    var headId = self.id.substring(1) + self.unique[uniqueIndex]
    //    var val = $("#" + rowId + " td[headers=" + headId + "]").html()
    //    uniqueProperties.push({ header: self.unique[uniqueIndex], value: val})
    //}

    //var qId = "?up=" + JSON.stringify(uniqueProperties)


    $("#" + rowId).detach();
    if (!keepData) { self._readData(); };
    //console.log(self.data)
};

Table.prototype._convertToTableFormat = function () {

    var self = this;

    if (self.table == "geography") { self.data = self.tdxData}
    if (self.table == "population") { self.data = self.tdxData}
    if (self.table == "demography") {

        var tempData = {};

        for (var i = 0; i < self.tdxData.length; i++) {

            var age_band = self.tdxData[i].age_band;

            if (!tempData.hasOwnProperty(age_band)) {
                tempData[age_band] = {}
            }

            tempData[age_band].age_band = age_band
            var gender = self.tdxData[i].gender;
            tempData[age_band]["locked-" + gender] = self.tdxData[i].locked;
            tempData[age_band]["ratio-" + gender] = self.tdxData[i].ratio;                
        }

        console.log(tempData)

        self.data = [];
        for (var key in tempData) {
            self.data.push(tempData[key])

        }

        console.log(self.data)

    }



}


Table.prototype._convertToTdxFormat = function () {

    if (self.table == "geography") { self.tdxData = self.data }
    if (self.table == "population") { self.tdxData = self.data }
    if (self.table == "demography") {

        for (var i = 0; i < self.data.length; i++) {



        }


        


    }


}


//todo write to tdx after converting





