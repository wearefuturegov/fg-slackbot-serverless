'use strict'

const { WebClient } = require('@slack/web-api')

const web = new WebClient(process.env.SLACK_TOKEN)

module.exports.alert = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Example response here',
        input: event,
      },
      null,
      2
    ),
  }
}