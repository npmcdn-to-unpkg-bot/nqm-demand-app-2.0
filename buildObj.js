module.exports = BuildObj;


function TableObj(data, columns, unique) {
    
    this.data = data;
    this.columns = columns;
    this.unique = unique;



}

TableObj.prototype.remove = function (uniqueProperties) {
    
    log("here")
    
    log(uniqueProperties)
    log(this)

}



function BuildObj(){
    
    this.geography = new TableObj(
        [
    
            [
            {header: "Id", value: "E1"},
            {header: "Name", value: "N1"},
            {header: "Ratio", value: 0.5},
            {header: "Locked", value: true}    
            ],
    
            [
            {header: "Id", value: "E2"},
            {header: "Name", value: "N2"},
            {header: "Ratio", value: 0.5},
            {header: "Locked", value: true}    
            ]
        ],
        [
            { header: "Id", text: "Area", type: "string", editable: false },
            { header: "Name", text: "Name", type: "string", editable: false },
            { header: "Ratio", text: "Ratio", type: "number", editable: true },
            { header: "Locked", text: "", type: "lock" }
        ],
        ["Id"]
    
    )
 

}







