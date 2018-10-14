const { Genre, validate } = require('..models/genre')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres)
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if (!genre) return res.status(404).send('Genre was not found')
    res.send(genre)
})

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error);

    let genre = new Genre({ type: req.body.type });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body); // Validate before updating
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, { type: req.body.type }, {
        new: true
    });
    
    if (!genre) return res.status(404).send('Genre with the given ID was not found');
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    if (!genre) return res.status(404).send('Genre with the given ID was not found');
    res.send(genre);
});

module.exports = router;