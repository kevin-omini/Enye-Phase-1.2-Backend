//ENYE TASK PHASE 1.2: BACKEND
const express = require("express");
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("http-status-codes");
const app = express();
const request = require("request");

//Visiting Currency Rates URL
app.get("/api/rates", function (req, res) {
  console.log("Request made to the Currency Rate Page");
  const base = req.query.base;
  const currency = req.query.currency;
  if (!base && !currency) {
    res.status(BAD_REQUEST).json({ message: "Incomplete data" });
  }
  const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const { base, date, rates } = JSON.parse(body);

      res.status(OK).json({ results: { base, date, rates } });
    } else {
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  });
});

//visiting Catch-all URL
app.get("*", function (req, res) {
  console.log("Request made to the Catch-all Page");
  res.send("Sorry, currency rates are not available.....");
});

app.listen(3000, function () {
  console.log("Serving Currency Rates Web App on Port 3000");
  console.log("Server Started");
  console.log("Listening.....");
});