const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(helmet()); 
app.use(morgan('tiny')); // Logging

const genres = [
    { id: 1, type: 'Action' },
    { id: 2, type: 'Thriller' },
    { id: 3, type: 'Horror' },
    { id: 4, type: 'Comedy' },
];

app.get('/', (req, res) => {
    res.send('')
});

app.get('/api/genres', (req, res) => {
    res.send(genres)
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre was not found')
    res.send(genre)
})

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error);

    const genre = {
        id: genres.length + 1,
        type: req.body.type
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with the given ID was not found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.type = req.body.type;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with the given ID was not found');

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1)
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        type: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listeling on port ' + port))