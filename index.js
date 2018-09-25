const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// Routes
const genres = require('./routes/genres');
const home = require('./routes/home');

// Database connection
mongoose.connect('mongodb://localhost/rentals')
    .then(() => console.log("Connected to rentals database"))
    .catch(err => console.log("Could not connect to the database", err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;



// Start server
app.listen(port, () => console.log('Listeling on port ' + port))

// createGenre()
// getGenres()
// updateGenre('5baa9990dc83e2218cf07166')
// deleteGenre('5baa9990dc83e2218cf07166')
