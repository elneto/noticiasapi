var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/noti',  {server:{auto_reconnect:true}});
var Entrada = mongoose.model('Entrada', require('./entrada'));

var app = express();

app.get('/', function (req, res){
	res.send("<a href='/noticias'>Mostrar noticias</a>");
});

app.get('/noticias', function (req, res){
	Entrada.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.listen(3000, function(){
	console.log('Noticias listening on port 3000');
});