
// DOM element where the Timeline will be attached
var container = document.getElementById("timeline");

// Create a DataSet (allows two way data-binding)
const items = new vis.Dataset();

//Populate the DataSet with query
connection.query("SELECT ? FROM ?", function(err, results) {
    if (err) throw err;

    items.clear();

    for (var i=0; i < results.length; i++) {

    items.add = ([
      { id=results[i].id, content=results[i].city_name, start=results[i].date_and_time}
    ])
  }
});

// Configuration for the Timeline
const options = {};

// Create a Timeline
var timeline = new vis.Timeline(container, items, options);


module.exports = timeline;