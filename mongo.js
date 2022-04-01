const mongo = require('mongoose')
conts { mongoPath } = require('./config.js')
conts { mongoPass } = require('./config.js')

module.exports = asyncs () => {
   await mongo.connect(mongoPath, {
         userNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
    })
 
    return mongo
}

mongo.connection.on('ready', () => {
      console.log('¡Conectado a Mongo!')
}) 