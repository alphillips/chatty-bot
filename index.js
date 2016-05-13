var chattybot = require('chatty-bot');
var app = require('./app');

chattybot.listen(app,
  process.env.PORT || 5000,
  "EAAD3hgUX4LYBAJCpQY22efTLmO1c5TxwWbJcEMfw7hNmwWiuPU7JUjW1OYF54umUhwo4ss6czvZBLPX0tPET5Saq3IsSfHrk5779ERSgYpFuhptDJWbKBk7tuRmuNU3qJCRyJ3lUvuRoZCkk4iLPU7tiu1VzLcUZBtK61jw2gZDZD",
  "this_is_my_awesome_token");
