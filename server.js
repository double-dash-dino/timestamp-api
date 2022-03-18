import express from "express";
import cors from "cors";

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

// If no date, return current date
app.get("/api", function (req, res) {
  res.send(makeDateJsonObject(new Date())).json();
});

app.get("/api/:date", function (req, res) {
  const isDate = (date) => {
    return !isNaN(Date.parse(date));
  };
  // If date, return correct json object, else return error
  if (isDate(req.params.date)) {
    res.send(makeDateJsonObject(req.params.date));
  } else {
    res.send("error: Invalid Date");
  }
});

const listener = app.listen(5000, function () {
  console.log("app running on port 5000");
});
