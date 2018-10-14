const Joi = require('joi');
const mongoose = require('mongoose');

// Model of Genre
const Genre = mongoose.model('Genre', new mongoose.Schema({
    type: { type: String, required: true },
    date: { type: Date, default: Date.now }
}));

function validateGenre(genre) {
    const schema = {
        type: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;