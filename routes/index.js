'use strict'

const express = require('express')

const chat = require('../controllers/chat')
const api = express.Router()

api.post('/chagpt/message', chat.sendMessage)
module.exports = api
