"use strict";
var express = require('express');
var expressHandlebars = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var ObjectId = mongodb.ObjectId;
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/step_by_step';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

//setup handlebars
app.engine('hbs', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
    res.render('step1')
});

app.get('/step1', function(req, res){
    res.render('step1')
});

app.post('/apply/step1', function(req, res){
    console.log(req.body);

    var application = req.body;

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .insertOne(application)
            .then(function(result){
                //res.send(result.ops);

                res.redirect('/apply/step2/' + result.ops[0]._id );
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send({});
            });
    });



});

app.get('/apply/step2/:id', function(req, res){
    //console.log(req.body);
    res.render('step2', {_id : req.params.id });
});

app.post('/apply/step2/:id', function(req, res){
    //console.log(req.body);
    var _id = req.params.id;

    var applicationFields = {
        first_name : req.body.first_name,
        last_name : req.body.last_name
    };

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .updateOne( { _id : ObjectId(_id) }, {$set : applicationFields})
            .then(function(result){
                //res.send(result.ops);

                res.redirect('/apply/step3/' + _id );
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send(err.stack);
            });
    });


    //res.render('step2');
});

app.get('/apply/step3/:id', function(req, res){
    var _id = req.params.id;

    MongoClient.connect(url, function(err, db) {
        var applications = db.collection('applications');
        applications
            .findOne( { _id : ObjectId(_id) })
            .then(function(result){
                res.send(result);

                //res.redirect('/apply/step3/' + _id );
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send({});
            });
    });


    //console.log(req.body);
    //res.render('step2');
});


var port = process.env.port || 3007;
app.listen(port, function(){
    console.log('running at port :' , port)
});
