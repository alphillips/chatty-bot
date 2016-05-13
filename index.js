var chattybot = require('chatty-bot');
var app = require('./app');

chattybot.listen(app,
  process.env.PORT || 5000,
  "EAAIEfsNb6YkBAOANnLIvadLtfAkrkzByZAdecDwadLsszJOuRvpH4BV70YoSDANOdg3KHZBPYJ9wnNHo9AG5cwmp2rWjJJfSDqrcngxH40VG6QG6ZBFZCD5IHg3uKDLzGKRd1DCo9Xm9EOefAfoifLGL6wJQntCYiykx78zmPwZDZD",
  "my_voice_is_my_password_verify_me");
