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
  let date = req.params.date;
  //   If date, return correct json object, else return error
  if (moment(date, "x", true).isValid()) {
    res.send({
      unix: date,
      utc: moment(new Date(parseInt(date / 1000, 10))).format(
        "ddd D MMM YYYY HH:MM:SS [GMT]"
      ),
    });
  } else if (moment(date, "YYYY-MM-DD", true).isValid()) {
    res.send({
      unix: moment(date).format("x") * 1000,
      utc: moment(date).format("ddd D MMM YYYY HH:MM:SS [GMT]"),
    });
  } else {
    res.send({ error: "Invalid Date" });
  }
});

const listener = app.listen(5000, function () {
  console.log("app running on port 5000");
});
