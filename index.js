const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');

// Routes
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/genres', genres);

// TODO: create a if statement only load in development mode
app.use(morgan('tiny')); // Logging

// Configuration
console.log("Application name: " + config.get('name'))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listeling on port ' + port))