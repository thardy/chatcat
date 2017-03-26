'use strict';
const express = require('express');
const app = express();
const chatCat = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'ejs');

// serve static files out of this folder - referenced as /css, /img, /js
app.use(express.static('public'));

// sessions has to be used before router is mounted
app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatCat.router);

app.listen(app.get('port'), () => {
    console.log('ChatCAT Running on Port: ', app.get('port'));
});

///
// if (process.env.NODE_ENV === 'production')