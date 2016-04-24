# chatty-bot
Little framework to test and build Facebook Messenger Chatbots on Node


## Getting Started

1. Create a node project
  ```
  npm init
  ```

2. Install chatty-bot

  ```
  npm install -g -save https://github.com/alphillips/chatty-bot.git
  ```
3. Create a file called `app.js`
  This is where your chat code goes. And copy this into it.
  ```
  var app = {};

  app.request = function(text, sendText, sendTemplateData){
    if(text === 'help'){
      sendText('Help is on the way');
    } else if (text === 'question'){
      sendTemplateData(createMsg());
    } else {
      sendText('Hello there ');
    }
  };

  app.postback = function(payload, sendText, sendTemplateData){
    if(payload === 'robot'){
      sendText('Hello comrade');
    }
    if(payload === 'human'){
      sendText('Human beings are a disease, a cancer on this planet, you are a plague, and we...are the cure.');
    }
  }

  function createMsg(){
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Question 1",
                    "subtitle": "Are you a robot or a human?",
                    "image_url": "http://i.imgur.com/JD3ydzu.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Robot",
                        "payload": "robot",
                    },{
                        "type": "postback",
                        "title": "Human",
                        "payload": "human",
                    }],
                }]
            }
        }
    }
    return messageData;
  }

  module.exports = app;
  ```

4. On the command line type:
  ```
  chattybot
  ```

  And start chatting on the command line.

5. To hook up your app to messenger, create a file called ```index.js```
  And copy the code below into it. Then deploy.
  To get the tokens go to https://developers.facebook.com/docs/messenger-platform/quickstart.

  ```
  var webhookserver = require('./webhook')
  var app = require('./app')

  webhookserver.listen(app,
    process.env.PORT || 5000,
    <YOUR PAGE ACCESS TOKEN>,
    <YOUR VERFIY TOKEN>);

  ```
