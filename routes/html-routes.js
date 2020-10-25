// Requiring path to so we can use relative routes to our HTML files
// eslint-disable-next-line no-unused-vars
const path = require("path");
const db = require("../models");
const { Op } = require("sequelize");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  app.get("/reports", (req, res) => {
    res.render("report");
  });

  app.get("/mySightings", (req, res) => {
    // If the user already has an account
    if (req.user) {
      db.Post.findAll({
        where: {
          UserId: req.user.id
        }
      }).then(results => {
        const myResults = [];
        for (let i = 0; i < results.length; i++) {
          myResults.push(results[i].dataValues);
        }
        console.log(myResults);
        res.render("mySightings", { myResults: myResults });
      });
    }
    console.log("youre not logged in");
  });

  app.get("/all", (req, res) => {
    // If the user already has an account
    if (req.user) {
      db.Post.findAll({}).then(results => {
        const myResults = [];
        for (let i = 0; i < results.length; i++) {
          myResults.push(results[i].dataValues);
        }
        console.log(myResults);
        res.render("allSights", { myResults: myResults });
      });
    }
    console.log("youre not logged in");
  });

  app.get("/all/:shape/:time", (req, res) => {
    if (req.params.shape === "all-shapes" && req.params.time !== "all-years") {
      db.Post.findAll({
        where: {
          date: { [Op.endsWith]: req.params.time }
        }
      }).then(results => {
        const myResults = [];
        for (let i = 0; i < results.length; i++) {
          myResults.push(results[i].dataValues);
        }
        // console.log(myResults);
        res.render("allSights", { myResults: myResults });
      });
    } else if (
      req.params.shape === "all-shapes" &&
      req.params.time === "all-years"
    ) {
      db.Post.findAll({}).then(results => {
        const myResults = [];
        for (let i = 0; i < results.length; i++) {
          myResults.push(results[i].dataValues);
        }
        // console.log(myResults);
        res.render("allSights", { myResults: myResults });
      });
    } else if (
      req.params.shape !== "all-shapes" &&
      req.params.time === "all-years"
    ) {
      db.Post.findAll({
        where: {
          shape: req.params.shape
        }
      }).then(results => {
        const myResults = [];
        for (let i = 0; i < results.length; i++) {
          myResults.push(results[i].dataValues);
        }
        res.render("allSights", { myResults: myResults });
      });
    } else {
      db.Post.findAll({
        where: {
          shape: req.params.shape,
          date: { [Op.endsWith]: req.params.time }
        }
      }).then(results => {
        const myResults = [];
        for (let i = 0; i < results.length; i++) {
          myResults.push(results[i].dataValues);
        }
        // console.log(myResults);
        res.render("allSights", { myResults: myResults });
      });
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("index");
  });
};
