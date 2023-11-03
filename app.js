'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const api = require('./routes')
var expressValidator=require('express-validator')

app.use(expressValidator())
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', api)

module.exports = app
