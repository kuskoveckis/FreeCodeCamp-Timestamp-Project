// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let inputDate = req.params.date;
  if (!inputDate) {
    let date = new Date();
    let utc = date.toUTCString();
    let unix = date.getTime();
    return res.json({ unix: unix, utc: utc });
  }
  if (inputDate.length <= 4) {
    return res.json({ unix: Number(inputDate), utc: new Date(0).toUTCString() });
  }

  if (!isNaN(inputDate)) {
    date = new Date(parseInt(inputDate));
  } else {
    date = new Date(inputDate);
  }
  let unix = date.getTime();
  let utc = date.toUTCString();
  if (utc === "Invalid Date") {
    return res.json({ error: utc });
  }
  res.json({ unix: unix, utc: utc });
});

// listen for requests :)
//process.env.PORT
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
