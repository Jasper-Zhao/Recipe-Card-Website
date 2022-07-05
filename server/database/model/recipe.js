const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: String,
    instructions: String
},{timestamps: true})

module.exports = mongoose.model('Recipes', RecipeSchema);
