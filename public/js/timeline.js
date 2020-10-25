const vis = require(vis);

function getData() {
  $.get("/api/all/", data => {
    if (data) {
      console.log(data);
    }
  });
}

getData();
createTimeline();
// DOM element where the Timeline will be attached

function createTimeline() {
  const container = document.getElementById("timeline");

  // Create a DataSet (allows two way data-binding)
  const items = new vis.Dataset(
    //Populate the DataSet with query
    connection.query("SELECT ? FROM date_and_time", (err, results) => {
      if (err) {
        throw err;
      }

      items.clear();

      for (let i = 0; i < results.length; i++) {
        items.add = [
          {
            id: results[i].id,
            content: results[i].city_name,
            start: results[i].date_and_time
          }
        ];
      }
      console.log(items);
    })
  );

  // Configuration for the Timeline
  const options = {};
  // Create a Timeline
  const timeline = new vis.Timeline(container, items, options);
  module.exports = timeline;
}
