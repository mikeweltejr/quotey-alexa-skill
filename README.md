# quotey-alexa-skill

## Tech Used:
  - babel
  - serverless: https://serverless.com/
  - nodejs 8.10
  - lambda

## lib/handler.js

- LaunchRequestHandler is used if you want to make a skill where you say "Alexa open [my skill invocation name]". I have it commented out here, but there for example purposes.
- MyQuoteyIntentHandler 
  * The first canHandle method is used to determine if it is the right intent, this needs to align with what was configured in your Amazon Dev Console.
  * The second piece is the actual handler which calls out to an api and will speak the return.
  
