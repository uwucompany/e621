const Discord = require('discord.js');
const client = new Discord.Client();
const wrapper = require("furry-wrapper");
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "e621-video",
  run: async(client, message, args) =>{

    if (args.join(" ").length < 1) return message.lineReply("Ingresa algo, no seas flojo. Ahh, y no se permite 1 sola letra mi amor :)")


    if(!message.channel.nsfw) return message.lineReply(`Este comando solo se puede usar en canales marcados como nsfw. Pinche horny`)

    let mensaje = message.channel.send
    const { FurryBot, Sheri, E6 } = require("furry-wrapper");
    let page = 0

    var options = {
      // Allows you to pass in a token through the authorization header
      //token: "OGhZVFNVRms6OGhZVFNVRms=",
      //Authorization: "OGhZVFNVRms6OGhZVFNVRms=",
      // The exact same as `token`
      //auth: "OGhZVFNVRms6OGhZVFNVRms=",
      TOKEN: "DxEE6JyUE6cLaV7RNRT2ZPpH",
      // Use your own custom user agent. User agent will always default to your Node.js version and OS name if no agent is provided
      agent: "My Progamme, contact@example.com",
      // Allows you to apply your own axios options whenever axios is used.
      axiosOptions: {
        // Sets a specific amount of time in milliseconds that axios will wait until the requested server responds.
        timeout: 1000,
        // You can find other axios options at https://github.com/axios/axios#request-config
      },
    };

    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor; //yoink

    const results = await E6.nsfw(`type:webm ${args.join(" ")}`, options)
    //kyro coder, pro
    console.log(results)
    const mensajeee = createEmbeds(results, client, roleColor, message.author)
    if(!mensajeee) return message.channel.send(`Un error ha ocurrido al intentar general el embed`)

    message.lineReply(mensajeee)
  }
}
function createEmbeds(data, bot, color, author){
    let mensajeee = `<:rem_pin:935684311099777104> **Artist(s):** ${data.tags.artist}\n<a:furr_blossom:837401291155570739> **E621 Post:** *https://e621.net/posts/${data.id}*\n<:rem_pinkheart:935615029577916427> **Type:** ${data.file.ext}\n<:rem_arrow2:935684310369964083> **Resolution:** ${data.file.width}x${data.file.height}\n<:rem_blankbutterfly:935624476945694750> **Descarga:** ${data.file.url}\n\n**Información:**\n> **Personaje(s):** ${data.tags.character}\n> **¿Copyright?:** ${data.tags.copyright}\n> **Score:** <:arrowup:945446546462376016> *${data.score.up}* <:arrowdown:945446547154432010> *${data.score.down}* <:arrow:945446545317314591> *${data.score.total}* <:furr_perfect_condition:840657564050915377> *${data.fav_count}*\n> **Rating:** *${data.rating}*\n> **Descripción:** ${data.description}`

  return mensajeee
}