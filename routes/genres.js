const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, type: 'Action' },
    { id: 2, type: 'Thriller' },
    { id: 3, type: 'Horror' },
    { id: 4, type: 'Comedy' },
];

router.get('/', (req, res) => {
    res.send(genres)
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre was not found')
    res.send(genre)
})

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error);

    const genre = {
        id: genres.length + 1,
        type: req.body.type
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with the given ID was not found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.type = req.body.type;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;