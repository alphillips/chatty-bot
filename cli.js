#!/usr/bin/env node

var wrapBot = require('wordwrap')(30);
var wrapYou = require('wordwrap')(20, 50);
var readline = require('readline');
var colors = require('colors');
var app = require(process.cwd() + '/app');

var rl = readline.createInterface(process.stdin, process.stdout),
prefix = '> ';

rl.on('line', function(line) {

  if(line.startsWith('~')){
    app.postback(templateData[line.substring(1)],1,sendText, sendTemplate);
  } else {
    console.log(wrapYou(line).white.bgBlue);
    console.log('\n');
    app.request(line, 1,sendText, sendTemplate);
  }
  rl.setPrompt(prefix, prefix.length);
  rl.prompt();
}).on('close', function() {
  process.exit(0);
});

console.log(prefix + '\n\nStart chatting...');
rl.setPrompt(prefix, prefix.length);
rl.prompt();

function sendText(text){
  console.log(wrapBot(text).black.bgWhite);
}

var templateData = [];

function sendTemplate(messageData){
  var elements = messageData.attachment.payload.elements;
  var output = '';
  for (var i in elements){
    var buttons = elements[i].buttons;
    var value = elements[i].title + '\n';
    for(var btn in buttons){
      value = value + ' - ' + buttons[btn].title + '\n';
      if(buttons[btn].type === 'postback'){
        templateData[elements[i].title + ' ' + buttons[btn].title] = buttons[btn].payload;
      }
    }
    output += value + '\n'
  }
  console.log(wrapBot(output).black.bgYellow);
}
