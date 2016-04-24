var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

var server = {};
server.app = null;
server.token = null;
server.hub_verify_token = null;

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot');
})

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === server.hub_verify_token) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            server.app.request(text, sender, sendTextMessageSender(sender), sendGenericMessageSender(sender));
        }
        if (event.postback) {
            server.app.postback(event.postback.payload, sender, sendTextMessageSender(sender), sendGenericMessageSender(sender));
        }
    }
    res.sendStatus(200)
})

function sendTextMessageSender(sender){
  return function sendTextMessage(text) {
      messageData = {
          text:text
      }
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token:server.token},
          method: 'POST',
          json: {
              recipient: {id:sender},
              message: messageData,
          }
      }, function(error, response, body) {
          if (error) {
              console.log('Error sending messages: ', error)
          } else if (response.body.error) {
              console.log('Error: ', response.body.error)
          }
      })
  }
}

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:server.token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessageSender(sender, messageData) {
  return function sendGenericMessage(messageData) {
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token:server.token},
          method: 'POST',
          json: {
              recipient: {id:sender},
              message: messageData,
          }
      }, function(error, response, body) {
          if (error) {
              console.log('Error sending messages: ', error)
          } else if (response.body.error) {
              console.log('Error: ', response.body.error)
          }
      })
  }
}



server.listen = function(_app, port, token, hub_verify_token){
  server.app = _app;
  server.token = token;
  server.hub_verify_token = hub_verify_token;
  app.listen(port, function() {
      console.log('running on port', port)
  })
}

module.exports = server;
