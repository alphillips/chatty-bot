var app = {};



app.postback = function(payload, senderId, sendText, sendTemplateData){
 if(payload === 'robot'){
   sendText('Hello comrade');
}
if(payload === 'human'){
 sendText('Human beings are a disease, a cancer on this planet, you are a plague, and we...are the cure.');
}
};

function createMsg(){
 var messageData = {
     "attachment": {
         "type": "template",
         "payload": {
             "template_type": "generic",
             "elements": [{
                 "title": "Before we start",
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
};
return messageData;
}

module.exports = app;
