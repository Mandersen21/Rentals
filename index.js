const express = require('express');
const Joi = require('joi');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const genresRoute = require('./routes/genres')
const defaultRoute
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(helmet()); // Security
app.use('/api/genres', genresRoute);
app.use('/', defaultRoute);

// TODO: create a if statement only load in development mode
app.use(morgan('tiny')); // Logging

// Configuration
console.log("Application name: " + config.get('name'))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listeling on port ' + port))