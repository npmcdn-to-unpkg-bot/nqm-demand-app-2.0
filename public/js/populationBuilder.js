



tableList = {

    g: {

        table: "geography",
        schema: "BuildGeography",
        divId: "#geographyTable",
        addId: "#geographyTableAddBtn",

        headers: [
            {
                "header": "id",
                "text": "Area",
                "type": "string",
                "editable": true,
                "unique": true
            },
            {
                "header": "name",
                "text": "Name",
                "type": "string",
                "editable": true
            },
            {
                "header": "ratio",
                "text": "Ratio",
                "type": "ratio",
                "editable": true
            },
            {
                "header": "locked",
                "text": "",
                "type": "lock"
            }
        ]

    },

    p: {

        table: "population",
        schema: "BuildTotalPopulation",
        divId: "#populationTable",
        addId: "#populationTableAddBtn",

        headers: [
            {
                "header": "year",
                "text": "Year",
                "type": "string",
                "editable": true,
                "unique": true
            },
            {
                "header": "persons",
                "text": "Persons",
                "type": "ratio",
                "editable": true
            }
        ]

    },

    d: {

        table: "demography",
        schema: "BuildDemography",
        divId: "#demographyTable",

        headers: [
            {
                "header": "locked-male",
                "text": "",
                "type": "lock"
            },
            {
                "header": "ratio-male",
                "text": "Males",
                "type": "ratio",
                "editable": true
            },
            {
                "header": "age_band",
                "text": "Age",
                "type": "string",
                "editable": true,
                "unique": true
            },
            {
                "header": "ratio-female",
                "text": "Females",
                "type": "ratio",
                "editable": true
            },
            {
                "header": "locked-female",
                "text": "",
                "type": "lock"
            }
        ]

    }



}


initPopulationBuilder = function (tdx, tableList) {

    var self = this;
    
    var gTable = new Table(tdx, tableList.g)

    var pTable = new Table(tdx, tableList.p)
    var dTable = new Table(tdx, tableList.d)

    
        
    //})


    //});

    //var gTable = new Table(tableList.g.url, tableList.g.id, tableList.g.addId)





}