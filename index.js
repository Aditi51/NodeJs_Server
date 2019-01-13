var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/addUser', function(req, res) {
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	  data = JSON.parse(data);
	  var userlist = req.body.users;
	  for(var val in userlist) {
      	data.users.push(userlist[val]);
      }
      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function(err1){
      	//console.log(err1);
      })
      res.end(JSON.stringify(data));
    })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})