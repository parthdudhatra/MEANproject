const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')

const postsRoutes = require('./routes/post')



mongoose
  .connect(
    "mongodb+srv://parth:7SnHMiYjY9Ue3QIJ@cluster0.5vd0n.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Connect to database");
  })
  .catch(() => {
    console.log("Connect to falied!");
  });

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts',postsRoutes)


module.exports = app;
