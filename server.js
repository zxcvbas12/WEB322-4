/********************************************************************************
 * WEB322 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Ji Ho Nam Student ID: 139817217 Date: Oct 24, 2023
 *
 * Published URL: https://jittery-gold-reindeer.cyclic.app/
 *
 ********************************************************************************/
const path = require("path");
const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.use(express.static("public"));

legoData.Initialize().then(() => {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/lego/sets", (req, res) => {
    const theme = req.query.theme;

    if (theme) {
      legoData
        .getSetsByTheme(theme)
        .then((sets) => {
          res.render("sets", { sets });
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    } else {
      legoData
        .getAllSets()
        .then((sets) => {
          res.render("sets", { sets });
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    }
  });

  app.get("/lego/sets/:setNum", (req, res) => {
    const setNum = req.params.setNum;
    legoData
      .getSetByNum(setNum)
      .then((set) => {
        if (set) {
          res.render("set", { set: set });
        } else {
          res.status(404).render("404");
        }
      })
      .catch((error) => {
        res.status(404).render("404");
      });
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  app.use((req, res) => {
    res.status(404).render("404", {
      message: "I'm sorry, we're unable to find what you're looking for",
    });
  });

  app.get("/", (req, res) => {
    res.render("home");
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
