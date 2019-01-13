# STEPS to install Nodejs and create a simple server

1. [Install nodejs from here](https://nodejs.org/en/download/)

2. Open command prompt and go to the directory where you want to create your server directory.

3. First run npm init and define the project preferences and variables.

4. Now the first step towards actually building a server.
   a. Install express package using command:
      npm install express --save (save flag is used to automatically add the package names in package.json file list of dependencies)
   b. If storing data in file system, install fs package using command:
      npm install fs --save

5. Create simple server with GET and POST requests.

Example of GET request to read all users from file and send as response

```
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})
```

For handling POST request, first add usage of json and urlencoded readers as below:
```
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
```
Then simply read JSON data from request like
req.body.attributename

For example to read the list of users being sent to addUser Method will be read and added to data as below:
```
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
```
