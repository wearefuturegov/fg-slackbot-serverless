'use strict'

require("dotenv").config()
const { WebClient, LogLevel } = require('@slack/web-api')

const web = new WebClient(process.env.OAUTH_ACCESS_TOKEN, {
  logLevel: LogLevel.DEBUG
})

// C024ZUHHC = #development channel
// C024ZJU25 = #general channel
const channelID = 'C024ZJU25'

module.exports.alert = async event => {
  let parsedBody = JSON.parse(event.body)

  console.log(parsedBody)

  if(parsedBody.type === "url_verification"){
    return {
      statusCode: 200,
      body: JSON.stringify({
        challenge: parsedBody.challenge
      })
    }
  } else if(parsedBody.type === "event_callback"){

    let { id, creator } = parsedBody.event.channel
    const conversationResponse = await web.conversations.info({ 
      channel: parsedBody.event.channel.id
    })
    
    
    const images = ['https://media.giphy.com/media/3o6MbsOVFTUYBZTCZG/giphy.gif', 'https://media.giphy.com/media/pNiDRNtb9yWdi/giphy.gif', 'https://media.giphy.com/media/PpMeUUFlZXQQ0/giphy.gif']
    let randomNum = Math.floor(Math.random() * Math.floor(images.length));


    let blocks = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:sparkles: *New channel created* :sparkles: \n<#${id}> _created by_ <@${creator}>`
        }
      },
    ];


    // if(conversationResponse.channel.purpose.value) {
    //   blocks.push({
    //     "type": "section",
    //     "text": {
    //       "type": "mrkdwn",
    //       "text": `> ${conversationResponse.channel.purpose.value} `
    //     }
    //   })
    // }
  
  
    // blocks.push({
    //   "type": "image",
    //   "image_url": images[randomNum],
    //   "alt_text": "gif"
    // })



    const res = await web.chat.postMessage({ 
      channel: channelID, 
      text: `:satellite_antenna: New channel created: <#${id}> by: <@${creator}>\nDescription: \n"_${conversationResponse.channel.purpose.value || "None given"}_"`,
      blocks: blocks
    })


    return {
      statusCode: 200,
      body: "Notified successfully"
    }
  }

  return {
    statusCode: 500,
    body: "Something weird happened "
  }
}