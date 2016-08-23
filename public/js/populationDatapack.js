

$(document).ready(function () {

    console.log(map_config)

    //init map
    var pMap = new Map("pdpMap", map_config)

    //add boundaries
    pMap.addBoundaries(map_config.sub_area_boundary_url)

    //add data

    //add time line

});