var express = require('express');

var app = express();
var PORT = process.env.PORT || 8080;

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'js'],
  index: true,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};

app.use(require('morgan')('dev'));
app.use(express.static('client'));

app.listen(PORT);

console.log("listening on Port %s", PORT);
