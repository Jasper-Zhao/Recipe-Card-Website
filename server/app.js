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
mongoose.connect('mongodb://localhost:27017/Assignment_4',() => {
    console.log('Connected to database!');
})
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cards',cardsRouter);

module.exports = app;
