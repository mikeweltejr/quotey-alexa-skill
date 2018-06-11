'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = undefined;

var _askSdkCore = require('ask-sdk-core');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const LaunchRequestHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
//   },
//   handle(handlerInput) {
//     const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

//     return handlerInput.responseBuilder
//       .speak(speechText)
//       .reprompt(speechText)
//       .withSimpleCard('Hello World', speechText)
//       .getResponse();
//   },
// };

var MrQuoteyIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'MrQuoteyIntent';
  },
  handle: async function handle(handlerInput) {
    var response = await _axios2.default.get('https://talaikis.com/api/quotes/random/');
    var randomQuote = response.data;

    return handlerInput.responseBuilder.speak('Here is your random quote by ' + randomQuote.author + '. ' + randomQuote.quote).getResponse();
  }
};

var HelpIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle: function handle(handlerInput) {
    var speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Hello World', speechText).getResponse();
  }
};

var CancelAndStopIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle: function handle(handlerInput) {
    var speechText = 'Goodbye!';

    return handlerInput.responseBuilder.speak(speechText).withSimpleCard('Hello World', speechText).getResponse();
  }
};

var SessionEndedRequestHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle: function handle(handlerInput) {
    console.log('Session ended with reason: ' + handlerInput.requestEnvelope.request.reason);

    return handlerInput.responseBuilder.getResponse();
  }
};

var ErrorHandler = {
  canHandle: function canHandle() {
    return true;
  },
  handle: function handle(handlerInput, error) {
    console.log('Error handled: ' + error.message);

    return handlerInput.responseBuilder.speak('Sorry, I can\'t understand the command. Please say again.').reprompt('Sorry, I can\'t understand the command. Please say again.').getResponse();
  }
};

var skillBuilder = _askSdkCore.SkillBuilders.custom();

var handler = exports.handler = skillBuilder.addRequestHandlers(MrQuoteyIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler).addErrorHandlers(ErrorHandler).lambda();