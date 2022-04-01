//MONITOR
const http = require('http');
const express = require('express');
const app = express();

//
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000); 


//DISCORD
const Discord = require('discord.js');
const client = new Discord.Client;
const fs = require("fs");
require('discord-inline-reply');
require('@thaldrin/sourcefinder')

const { MessageEmbed, Collection } = require("discord.js")

//disbut(client);
client.commands = new Collection()
client.nsfw_commands = new Collection()
client.aliases = new Collection()
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})
client.on('ready', (ready) => {

	const channelId = '850106183124779040'; ///Id del canal
  const channel = client.channels.cache.get(channelId); ///Esto obtiene el canal
  const upembed = new Discord.MessageEmbed() ///Crea embed
  .setTitle("Notificación de encendida.") ///Nombre
  .setColor('#ecd1ff') //Color
  .setDescription("hola che | Glitch") //Descripcion
  .setFooter(`Ahorita mismo estoy en ${client.guilds.cache.size} servers!`) //Esto va a mostrar en cuantos servidores esta
  .setThumbnail('') //URL De imagen nwn
  .setTimestamp()
  channel.send(upembed)

  const array = [
    {
      name: `HOST NSFW ACTIVADO`,
      type: "LISTENING"
    }
  ]

  setInterval(() => {
    presence();
    function presence() {
      let p = Math.floor(Math.random() * array.length)
      client.user.setActivity(array[p].name, {type: array[p].type, url: array[p].url ? array[p].url : null})
    }
  }, 10000)

  console.log(`Se ha iniciado sesión en ${client.user.tag}\n︵˚₊‿︵₊ Consola: ‿︵˚₊‿︵˚₊‧`)
})

client.on('message', message => {

  let prefix = "b."

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd))
  if (!command) return
  if (command) command.run(client, message, args)


});

/*
let prefix = "yo!"
let cmds = ["botinfo", "avatar", "ping", "userinfo", "angry", "blush", "cry", "dance", "happy", "hi", "hug", "kiss", "nervous", "reir", "u got that", "work", "say", "decir"] 

client.on('message', message => {
if(message.author.bot)return; 
if(message.channel.type === "dm")return; 
let args = message.content.slice(prefix.length).trim().split(/ +/g) 
let command = args.shift().toLowerCase(); 
if(!message.content.toLowerCase().startsWith(prefix))return; 

if(!cmds.includes(command)){ 
const embed = new MessageEmbed()
.setTitle("Comando no encontrado/escrito mal.")
.setDescription("Uhm, que raro, no encuentro nada. Asegurate de escribir bien el comando.") 
.setColor("#ffbffa")
.setFooter("Sí el comando existe, pero tira el error, por favor, reportelo al sv de Dinna.")
.setTimestamp()
message.channel.send(embed)

}

});
*/

client.login(process.env.TOKEN);