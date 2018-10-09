/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const SeeStarCraft = require('see-starcraft');

const APP_ID = 'amzn1.ask.skill.SKILL_ID_HERE';

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetRandomStarCraftBuilding');
  },
  'GetRandomStarCraftBuilding': function() {
    const ssc = new SeeStarCraft();
    const randomBuilding = ssc.getRandomBuilding();
    const speechOutput = `Your random StarCraft building is: ${randomBuilding}`;
    this.emit(':tellWithCard', speechOutput, 'Random StarCraft Buildings', randomBuilding);
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = 'This skill tells you a random StarCraft Brood War building. Would you like to hear one?';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.YesIntent': function() {
    this.emit('GetRandomStarCraftBuilding');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};
