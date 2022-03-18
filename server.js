import express from "express";
import cors from "cors";
import moment from "moment";

const app = express();
app.use(cors());

const makeDateJsonObject = (date) => {
  let unixTimestamp = parseInt(date.getTime() * 1000).toFixed(0);
  let utcTimestamp = date.toString();
  let response_object = {
    unix: unixTimestamp,
    utc: utcTimestamp,
  };
  return response_object;
};

app.get("/", function (req, res) {
  res.send(moment.utc());
});

// If no date, return current date
app.get("/api", function (req, res) {
  res.send(makeDateJsonObject(new Date())).json();
});

app.get("/api/:date", function (req, res) {
  const isDate = (date) => {
    if (date.length < 7) {
      return false;
    } else {
      return !isNaN(Date.parse(date));
    }
  };

  //   If date, return correct json object, else return error
  if (
    moment(req.params.date, "x", true).isValid() ||
    moment(req.params.date, "YYYY-MM-DD", true).isValid()
  ) {
    res.send({
      unix: req.params.date,
      utc: new Date(parseInt(req.params.date, 10)).toString(),
    });
  } else {
    res.send("error: Invalid Date");
  }
});

const listener = app.listen(5000, function () {
  console.log("app running on port 5000");
});
