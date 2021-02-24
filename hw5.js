var express = require('express');
var app = express();
//define handlebars variable
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//define bodyParser for post use
var bodyParser = require('body-parser');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//set port
app.set('port', 3000);
//set for post bodyParser and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for post request
app.post('/', function(req,res){
  var queryStrings = [];
  for (var key in req.body){
    queryStrings.push({'name':key,'value':req.body[key]})
  }
  var postJson = [];
  for (var key in req.query){
    postJson.push({'name':key,'value':req.query[key]})
  }
  var postcontext = {};
  postcontext.postHeading = 'POST Request Received';
  postcontext.postDataList = queryStrings;
  postcontext.postJsonList = postJson;
  res.render('home', postcontext);
});

//for get request
app.get('/',function(req,res){
  //first parameter is the view form handlebars , second parameter is the function
  var context = {};
  var queryStrings = [];
  for (var key in req.query){
    queryStrings.push({'name':key,'value':req.query[key]})
  }
  context.getHeading = 'GET Request Received';
  context.getDataList = queryStrings;
  res.render('home', context);
});

//for 404 status
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
