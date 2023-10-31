'use strict'

const app = require('./app')
const config = require('./config')

app.listen(config.port,()=>(console.log("El Puerto ES: "+config.port)))