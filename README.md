# FG Slackbot (serverless version)

This is a little [Serverless Framework](https://www.serverless.com) project.

## Developing locally

You need node.js, npm and the serverless CLI installed.

You'll also need a `.env` file in the root with Slack credentials.

Clone the repo and install dependencies with `npm i`.

## Deploying it to the web

If you have AWS credentials set up locally, you should be able to deploy it with:

```
serverless deploy
OR
serverless deploy --stage production
```