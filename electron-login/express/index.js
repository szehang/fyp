"use strict";

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dbDebugger = require('debug')('fyp:db')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Requiring routers
const users = require('./routes/users')

// Connecting to mongoDB
mongoose.connect('mongodb://localhost/electron-login', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => dbDebugger("Connected to MongoDB..."))
    .catch((err) => dbDebugger("Connection error - MongoDB"))

// Route Handlers
app.get('/', function(req, res) {
    res.send("This is a test request");
});

// Middleware
app.use(express.json())
app.use('/api/users', users)

// Listening to port
const port = process.env.PORT || 3000;
let server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
