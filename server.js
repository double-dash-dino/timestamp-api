import express from "express";
import cors from "cors";
import moment from "moment";

const app = express();
app.use(cors());

// If no date, return current date
app.get("/api", function (req, res) {
  res.send({
    unix: moment().format("x") * 1000,
    utc: moment().format("ddd D MMM YYYY HH:MM:SS [GMT]"),
  });
});

app.get("/api/:date", function (req, res) {
  //   If date, return correct json object, else return error
  if (moment(req.params.date, "x", true).isValid()) {
    res.send({
      unix: req.params.date,
      utc: new Date(parseInt(req.params.date, 10)).toString(),
    });
  } else if (moment(req.params.date, "YYYY-MM-DD", true).isValid()) {
    res.send({
      unix: moment(req.params.date).format("x") * 1000,
      utc: moment(req.params.date).format("ddd D MMM YYYY HH:MM:SS [GMT]"),
    });
  } else {
    res.send("error: Invalid Date");
  }
});

const listener = app.listen(5000, function () {
  console.log("app running on port 5000");
});
