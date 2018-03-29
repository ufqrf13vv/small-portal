const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();
const index = require('./routes/express');

app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    key: 'session',
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        secure: false
    },
    saveUninitialized: false,
    resave: false
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
    res.send(fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8'));
});

app.listen(4000);