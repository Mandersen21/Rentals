const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Routes
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;

// Database connection
mongoose.connect('mongodb://localhost/rentals')
    .then(() => console.log("Connected to rentals database"))
    .catch(err => console.log("Could not connect to the database", err))

const genreSchema = new mongoose.Schema({
    type: String,
    date: { type: Date, default: Date.now }
})

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre() {
    const genre = new Genre({
        type: "Thriller",
    });

    const result = await genre.save();
    console.log(result);
}

async function getGenres() {
    const genres = await Genre.find() // Gets all genres in the database
    // .limit(10)
    // .sort({ name: 1 }) 
    // .select({ name: 1, tags: 1 }) // only get name and tags
    // const genres = await Genre.find({ type: 'Action' }) // Only returns the one that is equaul to Action
    console.log(genres);
}

async function updateGenre(id) {
    
    // Approach 1
    const genre = await Genre.findById(id);
    if (!genre) return;
    genre.set({
        type: 'Thriller',
        date: Date.now()
    })

    const result = await genre.save();
    console.log(result);
}

async function deleteGenre(id) {
    const result = await Genre.deleteOne({ _id: id })
    console.log(result)
}

// Start server
app.listen(port, () => console.log('Listeling on port ' + port))

// createGenre()
// getGenres()
// updateGenre('5baa9990dc83e2218cf07166')
// deleteGenre('5baa9990dc83e2218cf07166')
