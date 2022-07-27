const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv = require('dotenv');
dotEnv.config({ path: './.env' });

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

//Database Connection
const URL = process.env.URL;
const OPTIONS = process.env.OPTIONS;
mongoose.connect(URL, OPTIONS, (err)=>{
  if(err){
    console.log(`Database connection failed ${err}`);
  }else{
    console.log(`Database connection successfull 🔥`);
  }
})

// Routing Implement
app.use("/api/v1", router);

module.exports = app;