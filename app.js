const express = require('express');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const {WebhookClient,Card, Suggestion,BrowseCarousel,BrowseCarouselItem,Image } = require('dialogflow-fulfillment');
const a11yText = 'Google Assistant Bubbles';
const googleUrl = 'https://google.com';
const expressApp = express().use(bodyParser.json());
expressApp.post('/fulfillment', functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent in Heroku!`);
    agent.add(new Card({
        title: `This is Agent in Heroku`,
        imageUrl: 'http://weknowyourdreams.com/images/robot/robot-02.jpg',
        text: `I am here to serve you.\n  Please free to ask me anything! 💁`,
        buttonText: 'Click Me to know more about me!',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.ask(new BrowseCarousel({
        items: [
          new BrowseCarouselItem({
            title: 'Title of item 1',
            url: googleUrl,
            description: 'Description of item 1',
            image: new Image({
              url: 'http://weknowyourdreams.com/images/robot/robot-02.jpg',
              alt: a11yText,
            }),
            footer: 'Item 1 footer',
          }),
          new BrowseCarouselItem({
            title: 'Title of item 2',
            url: googleUrl,
            description: 'Description of item 2',
            image: new Image({
              url: 'http://weknowyourdreams.com/images/robot/robot-02.jpg',
              alt: a11yText,
            }),
            footer: 'Item 2 footer',
          }),
        ],
      }));
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function test(agent) {
    agent.add(`This is a test`);

  }
  // Uncomment and edit to make your own intent handler
  // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // below to get this function to be run when a Dialogflow intent is matched
  function yourFunctionHandler(agent) {
    agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    agent.add(new Card({
        title: `Title: this is a card title`,
        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.add(new Suggestion(`Quick Reply`));
    agent.add(new Suggestion(`Suggestion`));
    agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  }

  // Uncomment and edit to make your own Google Assistant intent handler
  // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // below to get this function to be run when a Dialogflow intent is matched
  function googleAssistantHandler(agent) {
    let conv = agent.conv(); // Get Actions on Google library conv instance
    conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    agent.add(conv); // Add Actions on Google library responses to your agent's response
  }
  // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('TestIntent',test);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
})
);


var listener = 
expressApp.listen(
        process.env.PORT,
        process.env.IP,
        function(){
            console.log("server started");
            console.log("listening on port " +
            listener.address().port);
        });