const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./src/routes/Users");

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware & config
require('passport');
app.use(passport.initialize());

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 3001; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));