import express from "express";
import cors from "cors";
import moment from "moment";

const app = express();
app.use(cors());

// If no date, return current date
app.get("/api", function (req, res) {
  res.json({
    unix: parseInt(moment().format("x"), 10),
    utc: moment().format("ddd, DD MMM YYYY HH:mm:SS [GMT]"),
  });
});

app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  //   If date, return correct json object, else return error
  if (moment(date, "x", true).isValid()) {
    res.send({
      unix: parseInt(date, 10),
      utc: moment(new Date(parseInt(date, 10))).format(
        "ddd, DD MMM YYYY HH:mm:SS [GMT]"
      ),
    });
  } else if (Date.parse(date)) {
    res.send({
      unix: parseInt(moment(date).format("x"), 10),
      utc: moment(date).format("ddd, DD MMM YYYY HH:mm:SS [GMT]"),
    });
  } else if (moment(date, "YYYY-MM-DD", true).isValid()) {
    res.send({
      unix: parseInt(moment(date).format("x"), 10),
      utc: moment(date).format("ddd, DD MMM YYYY HH:mm:SS [GMT]"),
    });
  } else if (moment(date, "DD MMMM YYYY", true).isValid()) {
    res.send({
      unix: parseInt(moment(date).format("x"), 10),
      utc: moment(date).format("ddd, DD MMM YYYY HH:mm:SS [GMT]"),
    });
  } else {
    res.send({ error: "Invalid Date" });
  }
});
