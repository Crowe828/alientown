var express = require("express");

// var router = express.Router();


var timeline = require("");


// //Get function for acquiring data from the db
// router.get("/", function(req, res) {
//     sightings.all(function(data) {
//       var hbsObject = {
//           sightings: data
//       };
//       res.render("index", hbsObject);
//     });
//   });

// router.post("/api/sightings", function(req, res) {
//     sighting.create([
//       "id", "date_and_time", "city", "state", "shape", "duration", "summary", "posted"
//     ], [
//       req.body.id, req.body.date_and_time, req.body.city, req.body.state, req.body.shape, req.body.duration, req.body.summary, req.body.posted
//     ], function(result) {
  
//       res.json({ id: result.insertId });
//     });
//   });
  
  // router.put("/api/sightings/:id", function(req, res) {
  //   var condition = "id = " + req.params.id;
  

  //   router.delete("/api/sightings/:id", function(req, res) {
  //       var condition = "id = " + req.params.id;
      
  //       sighting.delete(condition, function(result) {
  //         if (result.affectedRows == 0) {
      
  //           return res.status(404).end();
  //         } else {
  //           res.status(200).end();
  //         }
  //       });
  //     });
  //   })



    var container = document.getElementById("timeline");



    var items = new vis.DataSet([

      connection.query("SELECT ? FROM ?", function(err, results) {
        if (err) throw err;
      
        var itemArray = [];

        for (var i=0; i < results.length; i++) {
        itemArray.push(results[i].id) }
        return itemArray
        

        .then(

          ForEach (
      { id: results.id, content: results.city_name, start: results.date_and_time},
          )    
    ]);

    var options = {};
    var timeline = new vis.Timeline(container, items, options);
    module.exports = timeline;