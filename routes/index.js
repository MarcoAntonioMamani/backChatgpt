'use strict'

const express = require('express')

const chat = require('../controllers/chat')
const jira = require('../controllers/jira')
const api = express.Router()

api.post('/chagpt/message', chat.sendMessage)
api.post('/chagpt/jira', jira.createTestCase)
api.get('/chagpt/jira/issues', jira.listarTareasTablero)
api.post('/chagpt/excel', jira.ExpotTestCaseExcel)
module.exports = api
