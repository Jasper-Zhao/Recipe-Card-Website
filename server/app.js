var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var cardsRouter = require('./routes/cards');

var app = express();
/* Connect to the Database */
mongoose.connect('mongodb+srv://CPSC455:CPSC455@assignment4.vobe6.mongodb.net/?retryWrites=true&w=majority',() => {
    console.log('Connected to database!');
})
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'build')));

app.use('/', indexRouter);
app.use('/cards',cardsRouter);

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app;
