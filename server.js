const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const path = require("path")
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

// Add routes, both API and view
app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooksearch"

// mongoose.Promise = Promise;
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).catch(e => {
  console.log(e);
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});