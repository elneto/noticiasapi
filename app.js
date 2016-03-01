var express = require('express');
var mongoose = require('mongoose');
var utils = require("./utils");

mongoose.connect('mongodb://localhost:27017/noti',  {server:{auto_reconnect:true}});
var Entrada = mongoose.model('Entrada', require('./entrada'));

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

app.get('/noticias/:id', function (req, res) {
  Entrada.find({_id:req.params.id }).exec(function (err, doc) {
		if (err) return utils.handleError(err);
        res.json(doc);
   });
});

app.get('/noticias/tuit/:id', function (req, res) {
  Entrada.find({_id:req.params.id }).exec(function (err, doc) {
		if (err) return utils.handleError(err);
	  
	  res.send(doc[0].title + ' ' + doc[0].link);
   });
});

app.get('/', function (req, res, next){
	res.send("<a href='/noticias'>Mostrar noticias</a>");
});

app.get('/noticias', function (req, res, next){
	Entrada.find({}).sort({date:-1}).exec(function (err, docs) {
		if (err) return utils.handleError(err);
        res.json(docs);
    });
});

app.listen(3000, function(){
	console.log('Noticias listening on port 3000 - cors');
});