var express = require('express');
var app = express();
var port = process.env.PORT || 5500;
var www = process.env.WWW || './';
app.use(express.static(www));
// eslint-disable-next-line no-console
console.log('serving' + www);
app.get('*', function (req, res) {
  res.sendFile('index.html', { root: www });
});
// eslint-disable-next-line no-console
app.listen(port, function () { console.log('listening on http://localhost:' + port); });
